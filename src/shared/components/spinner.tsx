"use client";

import { cn } from "@tailwind-config/utils/cn";

export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Color variant of the spinner
   * @default "brand"
   */
  variant?: "brand" | "primary" | "secondary" | "white";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Accessible label for screen readers
   * @default "Loading..."
   */
  label?: string;
}

const sizeClasses = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-[3px]",
} as const;

const variantClasses = {
  brand: "border-brand-secondary border-r-transparent",
  primary: "border-primary border-r-transparent",
  secondary: "border-secondary border-r-transparent",
  white: "border-white border-r-transparent",
} as const;

export const Spinner = ({
  size = "md",
  variant = "brand",
  className,
  label = "Loading...",
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "inline-block animate-spin rounded-full border-solid",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
};

Spinner.displayName = "Spinner";
