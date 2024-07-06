import type { IconComponentProps } from '.';

export function CheckIcon({ color = '#0F172A', ...props }: IconComponentProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <path
        d="M16.6666 5L7.49992 14.1667L3.33325 10"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
