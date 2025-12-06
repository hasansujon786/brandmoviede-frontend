import { SVGProps } from "react";
const CheckMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5007 2.08301H10.0007C6.2687 2.08301 4.40273 2.08301 3.24335 3.24237C2.08398 4.40175 2.08398 6.26772 2.08398 9.99967C2.08398 13.7316 2.08398 15.5976 3.24335 16.757C4.40273 17.9163 6.2687 17.9163 10.0007 17.9163C13.7326 17.9163 15.5986 17.9163 16.758 16.757C17.9173 15.5976 17.9173 13.7316 17.9173 9.99967V8.33301"
      stroke="#4A4C56"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M7.08398 8.33366L10.0007 11.2503L17.5008 2.91699"
      stroke="#4A4C56"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CheckMark;

export const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_6302_793)">
      <path
        d="M18.3346 9.99996C18.3346 5.39758 14.6036 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39758 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333C14.6036 18.3333 18.3346 14.6023 18.3346 9.99996Z"
        stroke="#E9355C"
        strokeWidth={1.5}
      />
      <path
        d="M6.66797 10.625C6.66797 10.625 8.0013 11.3854 8.66797 12.5C8.66797 12.5 10.668 8.12496 13.3346 6.66663"
        stroke="#E9355C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_6302_793">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const CheckMarkBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_6302_1333)">
      <path
        d="M12.659 12.6667H12.6654M12.659 12.6667C12.2439 13.0784 11.4916 12.9758 10.964 12.9758C10.3164 12.9758 10.0045 13.1025 9.5423 13.5647C9.14876 13.9583 8.62116 14.6667 7.9987 14.6667C7.37623 14.6667 6.84863 13.9583 6.45508 13.5647C5.99288 13.1025 5.68102 12.9758 5.0334 12.9758C4.50582 12.9758 3.75348 13.0784 3.33836 12.6667C2.9199 12.2518 3.02288 11.4963 3.02288 10.9653C3.02288 10.2943 2.87614 9.98577 2.39828 9.50791C1.68746 8.79711 1.33204 8.44164 1.33203 8.00004C1.33204 7.55837 1.68744 7.20297 2.39826 6.49215C2.82483 6.06559 3.02288 5.64289 3.02288 5.03475C3.02288 4.50714 2.92036 3.7548 3.33203 3.33967C3.74698 2.92123 4.50243 3.02421 5.03342 3.02421C5.64154 3.02421 6.06424 2.82617 6.4908 2.39962C7.20163 1.68879 7.55703 1.33337 7.9987 1.33337C8.44036 1.33337 8.79576 1.68879 9.50656 2.39962C9.93303 2.82609 10.3557 3.02421 10.964 3.02421C11.4916 3.02421 12.244 2.92169 12.6591 3.33337C13.0775 3.74833 12.9745 4.50377 12.9745 5.03475C12.9745 5.70576 13.1213 6.01429 13.5991 6.49215C14.31 7.20297 14.6654 7.55837 14.6654 8.00004C14.6654 8.44164 14.31 8.79711 13.5991 9.50791C13.1212 9.98577 12.9745 10.2943 12.9745 10.9653C12.9745 11.4963 13.0775 12.2518 12.659 12.6667Z"
        stroke="black"
      />
      <path
        d="M6 8.59525L7.2 9.66665L10 6.33331"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_6302_1333">
        <rect width={16} height={16} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TodoListChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.9805 7.01556C14.9805 7.01556 15.4805 7.51556 15.9805 8.51556C15.9805 8.51556 17.5687 6.01556 18.9805 5.51556"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99485 2.02134C7.49638 1.91556 5.56612 2.20338 5.56612 2.20338C4.34727 2.29053 2.01146 2.97385 2.01148 6.96454C2.0115 10.9213 1.98564 15.7993 2.01148 17.7439C2.01148 18.932 2.7471 21.7033 5.29326 21.8518C8.3881 22.0324 13.9627 22.0708 16.5204 21.8518C17.2051 21.8132 19.4846 21.2757 19.7731 18.7956C20.072 16.2263 20.0125 14.4407 20.0125 14.0157"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9998 7.01556C21.9998 9.77698 19.7591 12.0156 16.995 12.0156C14.2309 12.0156 11.9902 9.77698 11.9902 7.01556C11.9902 4.25414 14.2309 2.01556 16.995 2.01556C19.7591 2.01556 21.9998 4.25414 21.9998 7.01556Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M6.98047 13.0156H10.9804"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M6.98047 17.0156H14.9804"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
