import type { IconComponentProps } from '.';

export function HomeIcon({ color = '#CBD5E1', ...props }: IconComponentProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <path
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 23V15.8C8 15.3582 8.35817 15 8.8 15H15.2C15.6418 15 16 15.3582 16 15.8V23" fill="white" />
    </svg>
  );
}
