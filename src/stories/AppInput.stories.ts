import type { Meta, StoryObj } from '@storybook/react';
import AppInput from '@/components/AppInput';

const meta = {
  title: 'Components/AppInput',
  component: AppInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    width: { control: 'text' },
    isSecured: { control: 'boolean' },
  },
  args: {
    placeholder: 'This is a test placeholder',
    label: 'Email',
    width: 360,
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    placeholder: 'Enter your email',
    label: 'Email',
    width: 360,
  },
};

export const Secured: Story = {
  args: {
    placeholder: 'Enter your password',
    label: 'Password',
    isSecured: true,
    width: 360,
  },
};
