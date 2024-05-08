import React from 'react';

import type { IconComponentProps } from '.';

export function FillCheckBoxIcon({ color = '#64748B', ...props }: IconComponentProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <rect width="16" height="16" rx="4" fill="currentColor" />
      <path d="M6 6L10 10" stroke="#F1F5F9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6L6 10" stroke="#F1F5F9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OutlineCheckBoxIcon({ color = '#CBD5E1', ...props }: IconComponentProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#F8FAFC" stroke="currentColor" />
      <path d="M6 6L10 10" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6L6 10" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
