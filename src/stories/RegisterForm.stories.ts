import type { Meta, StoryObj } from '@storybook/react';
import RegisterForm from '@/components/auth/RegisterForm';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    handleClickLogin: fn(),
    email: '',
    name: '',
    password: '',
    setPassword: fn(),
    setName: fn(),
    setEmail: fn(),
    handleRegister: fn(),
    errors: {},
  },
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    email: 'test@example.com',
    name: 'John Doe',
    password: 'password123',
    setPassword: fn(),
    setName: fn(),
    setEmail: fn(),
    handleClickLogin: fn(),
    handleRegister: fn(),
    errors: {
      email: 'Invalid email address',
      password: 'Password is too short',
      name: 'Name is required',
    },
  },
};
