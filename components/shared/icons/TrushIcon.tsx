import { type SVGProps } from "react";

export const TrushIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="currentColor"
        d="m13 3.667-.413 6.683c-.106 1.708-.159 2.562-.586 3.176a2.7 2.7 0 0 1-.8.752c-.64.389-1.495.389-3.206.389-1.713 0-2.57 0-3.209-.39a2.7 2.7 0 0 1-.8-.753c-.428-.615-.48-1.47-.583-3.18L3 3.667m-1-.001h12m-3.296 0-.455-.939c-.303-.623-.454-.935-.715-1.13a1.3 1.3 0 0 0-.183-.114c-.288-.15-.635-.15-1.328-.15-.71 0-1.066 0-1.36.156a1.3 1.3 0 0 0-.185.12c-.264.202-.41.525-.706 1.172l-.403.885M6.336 11V7m3.328 4V7"
        strokeLinecap="round"
      />
    </svg>
  );
};
