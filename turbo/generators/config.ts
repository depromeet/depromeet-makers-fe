import type { PlopTypes } from '@turbo/gen';

import { REPO_NAME } from './templates/constants';
import { createPackageConfig } from './templates/packages/config';

export default function generator(plop: PlopTypes.NodePlopAPI) {
  plop.setHelper('toPackageName', (input) => `${REPO_NAME}/${input}`);

  plop.setGenerator('create-package', createPackageConfig);
}
