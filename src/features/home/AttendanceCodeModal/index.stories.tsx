import type { Meta } from '@storybook/react';

import { AttendanceCodeModal } from '.';

const meta: Meta<typeof AttendanceCodeModal> = {
  title: 'home/AttendanceCodeModal',
  component: AttendanceCodeModal,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return <AttendanceCodeModal isOpen setOpen={() => {}} />;
};
