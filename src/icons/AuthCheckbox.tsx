import * as React from 'react';
import { SVGProps } from 'react';
const AuthCheckbox = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path fill="#51525C" d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z" />
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6.25 10 2.5 2.5 5-5" />
  </svg>
);
export default AuthCheckbox;
