import type { Meta, StoryObj } from '@storybook/react';
import AppInput from '@/components/AppInput';

const meta = {
  title: 'Components/AppInput',
  component: AppInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
<<<<<<< HEAD
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { placeholder: 'This is a test placeholder', label: 'Email', width: 360 },
=======
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
>>>>>>> main
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
    width: 360,
    isSecured: true,
    width: 360,
  },
};
