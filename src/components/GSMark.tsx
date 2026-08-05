import type { SVGProps } from 'react';

export default function GSMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" {...props}>
      <path d="M29.5 7.5H16.8C11.94 7.5 8 11.44 8 16.3s3.94 8.8 8.8 8.8h8.9c4.58 0 8.3 3.72 8.3 8.3s-3.72 8.3-8.3 8.3H11.5" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
      <path d="M35.5 12.5H22.8c-4.86 0-8.8 3.94-8.8 8.8s3.94 8.8 8.8 8.8h7.9" stroke="var(--accent)" strokeWidth="4" strokeLinecap="square" />
      <path d="M6 35.5 38 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M31 35.5h7v-7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
