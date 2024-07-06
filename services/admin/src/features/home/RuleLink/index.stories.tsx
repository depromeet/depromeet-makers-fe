import type { Meta } from '@storybook/react';

import { RuleLink } from '.';

const meta: Meta<typeof RuleLink> = {
  title: 'home/RuleLink',
  component: RuleLink,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return <RuleLink />;
};
