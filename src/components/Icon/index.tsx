import type { SVGProps } from 'react';

import { ArrowDown, ArrowLeft, ArrowUp } from './ArrowIcon';
import { CalendarIcon } from './CalendarIcon';
import { FillCheckBoxIcon, OutlineCheckBoxIcon } from './CheckBoxIcon';
import { CheckIcon } from './CheckIcon';
import { ClipboardCheckIcon } from './ClipboardCheckIcon';
import { AbsenceFaceIcon, BaseFaceIcon, LatenessFaceIcon } from './FaceIcon';
import { HomeIcon } from './HomeIcon';
import { PaperIcon } from './PaperIcon';
import { RefreshIcon } from './RefreshIcon';
import { StateIcon } from './StateIcon';
import { TeamIcon } from './TeamIcon';
import { UserIcon } from './UserIcon';
import { XIcon } from './XIcon';

export const IconComponentMap = {
  'checkbox-fill': FillCheckBoxIcon,
  'checkbox-outline': OutlineCheckBoxIcon,
  home: HomeIcon,
  calendar: CalendarIcon,
  user: UserIcon,
  face: BaseFaceIcon,
  'face-lateness': LatenessFaceIcon,
  'face-absence': AbsenceFaceIcon,
  'clipboard-check': ClipboardCheckIcon,
  'x-icon': XIcon,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  check: CheckIcon,
  state: StateIcon,
  refresh: RefreshIcon,
  team: TeamIcon,
  paper: PaperIcon,
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
