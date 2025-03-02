import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { REPO_NAME } from '../constants';

export const createPackageConfig: PlopTypes.PlopGeneratorConfig = {
  description: '세로운 packages를 생성해요',
  prompts: [
    {
      type: 'input',
      name: 'packageName',
      message: '패키지 이름 입력 >',
      validate: (input) => {
        const kebabCaseRegex = /^[a-z]+(-[a-z]+)*$/;
        if (!kebabCaseRegex.test(input)) {
          return '패키지명은 소문자 + kebab-case로 작성해주세요 (ex., "sample-package")';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      name: 'apps',
      message: '사용되는 앱 선택(복수 선택 가능) >',
      choices: () =>
        fs.readdirSync(path.resolve('apps')).filter((file) => fs.statSync(path.join('apps', file)).isDirectory()),
    },
  ],
  actions: (data) => {
    const actions: PlopTypes.Actions = [];

    // 1. 패키지 폴더 생성 및 템플릿 파일 추가
    actions.push({
      type: 'addMany',
      destination: `packages/{{packageName}}`,
      templateFiles: ['./templates/package.json.hbs'],
      globOptions: {
        dot: true,
      },
    });

    // 2. 선택한 apps에 패키지 의존성 추가
    data?.apps.forEach((app) => {
      actions.push({
        type: 'modify',
        path: `apps/${app}/package.json`,
        pattern: /"dependencies": \{/,
        template: `"dependencies": {\n    "${REPO_NAME}/{{packageName}}": "workspace:*",`,
      });
    });

    // 3. 패키지 의존성 설치
    actions.push(() => {
      const packageDir = path.resolve(`packages/${data?.packageName}`);
      try {
        console.log(`Running "pnpm install" in ${packageDir}...`);
        execSync('pnpm install', { cwd: packageDir, stdio: 'inherit' });
        console.log('pnpm install completed successfully.');
      } catch (error) {
        console.error('Error during pnpm install:', error.message);
      }
      return 'Installed dependencies for the new package.';
    });

    return actions;
  },
};
