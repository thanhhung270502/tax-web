"use client";

import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@tailwind-config/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  ["inline-flex items-center justify-center", "select-none whitespace-nowrap", "font-medium"],
  {
    variants: {
      variant: {
        // Default
        white: ["bg-white text-black border-secondary"],
        gray: ["bg-neutral-400 text-neutral-900 border-neutral-200"],
        brand: ["bg-brand-primary-alt text-brand-primary border-brand-primary-alt"],
        error: ["bg-error-alt text-error border-error-alt"],
        warning: ["bg-warning-alt text-warning border-warning-alt"],
        success: ["bg-success-alt text-success border-success-alt"],
        blue: ["bg-brand-secondary-alt text-brand-secondary border-brand-secondary-alt"],
        teal: ["bg-tertiary text-neutral-600 border-tertiary"],
        // Number - brand, orange, neutral
        neutral: ["bg-neutral-200 text-neutral-900 border-neutral-200"],
      },
      size: {
        small: ["h-4 w-4 min-w-4", "body-xs"],
        medium: ["h-4.5 w-4.5 min-w-4.5", "body-sm"],
        large: ["h-6 w-6 min-w-6", "body-sm"],
      },
      shape: {
        "full-rounded": ["rounded-4xl h-auto w-auto min-w-max"],
        rectangle: ["rounded-xs h-auto w-auto min-w-max"],
      },
      type: {
        number: ["h-4 w-4 min-w-4 rounded-full border-none"],
        label: ["h-auto w-auto min-w-max gap-xs border"],
      },
    },
    compoundVariants: [
      // Number badges
      {
        type: "number",
        size: "small",
        class: ["h-4 w-4 min-w-4 p-xs", "body-xs"],
      },
      {
        type: "number",
        size: "medium",
        class: ["h-4.5 w-4.5 min-w-4.5 px-xs py-md", "body-sm"],
      },
      {
        type: "number",
        size: "large",
        class: ["h-6 w-6 min-w-6 px-sm py-md", "body-md"],
      },
      {
        type: "number",
        variant: "neutral",
        class: [""],
      },
      {
        type: "number",
        variant: "brand",
        class: ["bg-brand-solid text-white"],
      },
      // Label badges
      {
        type: "label",
        size: "small",
        class: ["px-md py-xxs min-h-4", "body-sm"],
      },
      {
        type: "label",
        size: "medium",
        class: ["px-lg py-xxs min-h-4.5", "body-md"],
      },
      {
        type: "label",
        size: "large",
        class: ["px-lg py-xs min-h-6", "body-md"],
      },
    ],
    defaultVariants: {
      variant: "brand",
      size: "medium",
      shape: "full-rounded",
      type: "label",
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export const Badge = ({
  className,
  variant,
  size,
  shape,
  type,
  children,
  ref,
  ...props
}: BadgeProps & { ref?: Ref<HTMLSpanElement> }) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, shape, type }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export type { BadgeProps };
