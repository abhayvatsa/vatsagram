import { FC, MouseEvent } from "react";

const ChevronLeft: FC<{
  onClick?: (e: MouseEvent) => void;
}> = (props) => (
  <svg
    display="inherit"
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--theme-text)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-left"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export default ChevronLeft;
