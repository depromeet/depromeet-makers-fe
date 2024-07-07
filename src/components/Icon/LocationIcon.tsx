import type { IconComponentProps } from '.';

export function LocationIcon({ color = '#64748B', ...props }: IconComponentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      color={color}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00119 8.99675C6.99519 8.99675 6.17653 8.17875 6.17653 7.17275C6.17653 6.16675 6.99519 5.34808 8.00119 5.34808C9.00719 5.34808 9.82519 6.16675 9.82519 7.17275C9.82519 8.17875 9.00719 8.99675 8.00119 8.99675ZM11.7439 3.10142C10.7232 2.04875 9.39386 1.46875 8.00119 1.46875C6.60719 1.46875 5.27786 2.04875 4.25653 3.10208C3.21986 4.17142 2.65053 5.60808 2.69519 7.04408C2.82119 11.1134 7.61453 14.2821 7.81919 14.4148L7.99853 14.5314L8.17986 14.4168C8.38386 14.2874 13.1805 11.1954 13.3072 7.04342C13.3512 5.60808 12.7812 4.17075 11.7439 3.10142Z"
        fill="#64748B"
      />
    </svg>
  );
}
