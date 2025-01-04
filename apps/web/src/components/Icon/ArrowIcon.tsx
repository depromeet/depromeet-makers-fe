import type { IconComponentProps } from '.';

export function ArrowDown(props: IconComponentProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke={props.color ?? '#0F172A'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUp(props: IconComponentProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 10L8 6L4 10"
        stroke={props.color ?? '#0F172A'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeft(props: IconComponentProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 18L9 12L15 6"
        stroke={props.color ?? '#0F172A'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight(props: IconComponentProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.82665 3.04102L7.88598 3.98568L11.248 7.33302H2.19531V8.66635H11.2473L7.88598 12.0143L8.82665 12.959L13.8066 7.99968L8.82665 3.04102Z"
        fill="#64748B"
      />
    </svg>
  );
}
