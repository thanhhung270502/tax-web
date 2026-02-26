"use client";

import type { ReactNode } from "react";
import { cn } from "@tailwind-config/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const breadcrumbVariants = cva(["flex items-center border-b border-gray-100"], {
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
  ["inline-flex items-center gap-1.5", "text-sm font-semibold", "transition-colors"],
  {
    variants: {
      variant: {
        default: ["text-gray-700", "hover:text-gray-900"],
        active: ["text-gray-900", "cursor-default"],
        disabled: ["text-gray-400", "cursor-not-allowed"],
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
  href,
  active = false,
  disabled = false,
  onClick,
  className,
}: BreadcrumbItemProps) => {
  const variant = disabled ? "disabled" : active ? "active" : "default";
  const isLink = href && !disabled && !active;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || active) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const content = (
    <>
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {children}
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

export const Breadcrumb = ({ children, separator = "/", size, className }: BreadcrumbProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className={cn(breadcrumbVariants({ size }), className)}>
      <ol className="flex items-center gap-2">
        {filteredChildren.map((child, index) => (
          <li key={index} className="flex items-center gap-2">
            {child}
            {index < filteredChildren.length - 1 && (
              <span className="text-sm text-gray-400 select-none" aria-hidden="true">
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
