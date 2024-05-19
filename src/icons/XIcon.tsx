import * as React from 'react';
import { SVGProps } from 'react';
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      stroke="#70707B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M23 13 13 23m0-10 10 10"
    />
  </svg>
);
export default XIcon;
