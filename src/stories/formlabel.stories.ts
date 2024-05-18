
import type { Meta, StoryObj } from '@storybook/react';
import AppInput from '@/components/formLabel';

const meta = {
  title: 'Components/FormLabel',
  component: AppInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {
  },
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { label: 'name'
  },
};
