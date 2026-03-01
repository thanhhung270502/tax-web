"use client";

import type { ReactNode } from "react";
import { cn } from "@tailwind-config/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const breadcrumbVariants = cva(["flex items-center"], {
  variants: {
    size: {
      sm: ["px-3 py-2"],
      md: ["px-4 py-2.5"],
      lg: ["px-5 py-3"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbItemVariants = cva(
  [
    "inline-flex items-center gap-1",
    "text-sm font-normal",
    "transition-colors",
    "rounded px-2 py-1",
  ],
  {
    variants: {
      variant: {
        default: ["text-gray-700", "hover:bg-gray-100"],
        active: ["text-gray-900", "font-medium"],
        disabled: ["text-gray-400", "cursor-not-allowed"],
        collapse: ["text-gray-700", "hover:bg-gray-100"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BreadcrumbItemProps {
  /**
   * The label/text to display
   */
  children: ReactNode;
  /**
   * Optional icon to display before the label
   */
  icon?: ReactNode;
  /**
   * Optional icon to display after the label
   */
  endIcon?: ReactNode;
  /**
   * Optional href for navigation
   */
  href?: string;
  /**
   * Whether this is the active/current item
   */
  active?: boolean;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item has a dropdown
   */
  hasDropdown?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Custom className
   */
  className?: string;
}

export interface BreadcrumbProps extends VariantProps<typeof breadcrumbVariants> {
  /**
   * Breadcrumb items - can be BreadcrumbItem components or custom JSX
   */
  children: ReactNode;
  /**
   * Custom separator between items (default: "/")
   */
  separator?: ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const BreadcrumbItem = ({
  children,
  icon,
  endIcon,
  href,
  active = false,
  disabled = false,
  hasDropdown = false,
  onClick,
  className,
}: BreadcrumbItemProps) => {
  const variant = disabled ? "disabled" : active ? "active" : "default";
  const isLink = href && !disabled && !active;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const content = (
    <>
      {icon && <span className="inline-flex items-center">{icon}</span>}
      <span>{children}</span>
      {hasDropdown && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="inline-flex items-center"
        >
          <path d="M4.5 6L8 9.5L11.5 6H4.5Z" />
        </svg>
      )}
      {endIcon && <span className="inline-flex items-center">{endIcon}</span>}
    </>
  );

  const commonProps = {
    className: cn(breadcrumbItemVariants({ variant }), className),
    "aria-current": active ? ("page" as const) : undefined,
    "aria-disabled": disabled,
  };

  if (isLink) {
    return (
      <a href={href} onClick={handleClick} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={handleClick} {...commonProps}>
      {content}
    </button>
  );
};

BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbCollapse = ({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(breadcrumbItemVariants({ variant: "collapse" }), className)}
      aria-label="Show more breadcrumb items"
    >
      <span>...</span>
    </button>
  );
};

BreadcrumbCollapse.displayName = "BreadcrumbCollapse";

export const Breadcrumb = ({ children, separator = ">", size, className }: BreadcrumbProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className={cn(breadcrumbVariants({ size }), className)}>
      <ol className="flex items-center gap-1">
        {filteredChildren.map((child, index) => (
          <li key={index} className="flex items-center gap-1">
            {child}
            {index < filteredChildren.length - 1 && (
              <span className="text-sm text-gray-500 select-none px-1" aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Collapse = BreadcrumbCollapse;
