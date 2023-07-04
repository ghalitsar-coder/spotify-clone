import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { GrRefresh } from "react-icons/gr";
import IsLoadingButton from "./isLoadingButton";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          `w-full rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed text-black font-bold disabled:opacity-75 transition whitespace-nowrap `,
          className
        )}
        {...props}
        ref={ref}
      >
        {isLoading ? <IsLoadingButton /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
