import type { SVGProps } from 'react';

import { FillCheckBox, OutlineCheckBox } from './CheckBox';

export const IconComponentMap = {
  'checkbox-fill': FillCheckBox,
  'checkbox-outline': OutlineCheckBox,
} as const;

interface Props extends IconComponentProps {
  name: keyof typeof IconComponentMap;
}

export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  onClick?: () => void;
  size?: number;
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = IconComponentMap[name];

  return <IconComponent {...props} />;
}
