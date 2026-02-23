import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { isValidElement } from "react";
import type { Icon, IconWeight } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200 cursor-pointer",
    "active:outline-none focus-visible:outline-none focus-visible:focus-ring-shadow-xs",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        // Contained variants
        "contained-primary": [
          "bg-brand-primary text-white border border-brand-primary font-semibold",
          "hover:bg-brand-primary-hover hover:border-brand-primary-hover hover:text-white",
          "active:bg-brand-primary active:border-brand-primary active:text-white",
          "disabled:bg-brand-primary-alt disabled:text-brand-primary-disabled disabled:border-brand-primary-disabled disabled:shadow-xs",
        ],
        "contained-secondary": [
          "bg-brand-secondary text-white border border-brand-secondary font-semibold",
          "hover:bg-brand-secondary-hover hover:border-brand-secondary-hover hover:text-white",
          "active:bg-brand-secondary active:border-brand-secondary active:text-white",
          "disabled:bg-brand-secondary-alt disabled:text-brand-secondary-disabled disabled:border-brand-secondary-disabled disabled:shadow-xs",
        ],
        "contained-success": [
          "bg-success text-white border border-success font-semibold",
          "hover:bg-success-hover hover:border-success-hover hover:text-white",
          "active:bg-success active:border-success active:text-white",
          "disabled:bg-success-alt disabled:text-success-disabled disabled:border-success-disabled disabled:shadow-xs",
        ],
        "contained-warning": [
          "bg-warning text-white border border-warning font-semibold",
          "hover:bg-warning-hover hover:border-warning-hover hover:text-white",
          "active:bg-warning active:border-warning active:text-white",
          "disabled:bg-warning-alt disabled:text-warning-disabled disabled:border-warning-disabled disabled:shadow-xs",
        ],
        "contained-error": [
          "bg-error text-white border border-error font-semibold",
          "hover:bg-error-hover hover:border-error-hover hover:text-white",
          "active:bg-error active:border-error active:text-white",
          "disabled:bg-error-alt disabled:text-error-disabled disabled:border-error-disabled disabled:shadow-xs",
        ],
        "contained-gray": [
          "bg-neutral-500 text-white border border-neutral-200 font-semibold",
          "hover:bg-neutral-600 hover:border-neutral-600 hover:text-white",
          "active:bg-neutral-600 active:border-neutral-600 active:text-white",
          "disabled:bg-neutral-100 disabled:text-disabled disabled:border-neutral-100 disabled:shadow-xs",
        ],
        "contained-dark": [
          "bg-black text-white border border-black font-semibold",
          "hover:bg-neutral-700 hover:border-neutral-700",
          "active:bg-black active:border-black",
          "disabled:bg-black-disabled disabled:text-disabled disabled:border-black-disabled disabled:shadow-xs",
        ],
        // Outlined variants
        "outlined-primary": [
          "bg-transparent text-brand-primary border border-brand-primary font-semibold",
          "hover:bg-brand-primary-hover hover:border-brand-primary-hover hover:text-white",
          "active:bg-brand-primary active:border-brand-primary active:text-white",
          "disabled:text-brand-primary-disabled disabled:border-brand-primary-disabled disabled:shadow-xs",
        ],
        "outlined-secondary": [
          "bg-transparent text-brand-secondary border border-brand-secondary font-semibold",
          "hover:bg-brand-secondary-hover hover:border-brand-secondary-hover hover:text-white",
          "active:bg-brand-secondary active:border-brand-secondary active:text-white",
          "disabled:text-brand-secondary-disabled disabled:border-brand-secondary-disabled disabled:shadow-xs",
        ],
        "outlined-success": [
          "bg-transparent text-success border border-success font-semibold",
          "hover:bg-success-hover hover:border-success-hover hover:text-white",
          "active:bg-success active:border-success active:text-white",
          "disabled:text-success-disabled disabled:border-success-disabled disabled:shadow-xs",
        ],
        "outlined-warning": [
          "bg-transparent text-warning border border-warning font-semibold",
          "hover:bg-warning-hover hover:border-warning-hover hover:text-white",
          "active:bg-warning active:border-warning active:text-white",
          "disabled:text-warning-disabled disabled:border-warning-disabled disabled:shadow-xs",
        ],
        "outlined-error": [
          "bg-transparent text-error border border-error font-semibold",
          "hover:bg-error-hover hover:border-error-hover hover:text-white",
          "active:bg-error active:border-error active:text-white",
          "disabled:text-error-disabled disabled:border-error-disabled disabled:shadow-xs",
        ],
        "outlined-gray": [
          "bg-transparent text-neutral-700 border border-neutral-500 font-semibold",
          "hover:bg-neutral-500 hover:border-neutral-500 hover:text-white",
          "active:bg-neutral-500 active:border-neutral-500 active:text-white",
          "disabled:text-gray-disabled disabled:border-gray-disabled disabled:shadow-xs",
        ],
        "outlined-dark": [
          "bg-transparent text-black border border-black font-semibold",
          "hover:bg-black hover:border-black hover:text-white",
          "active:bg-black active:border-black active:text-white",
          "disabled:text-disabled disabled:border-black-disabled disabled:shadow-xs",
        ],
        // Text variants
        "text-primary": [
          "bg-transparent text-brand-primary font-semibold",
          "hover:text-brand-primary-hover hover:bg-brand-primary-alt",
          "active:text-brand-primary-active active:bg-brand-primary-alt",
          "disabled:text-disabled disabled:border-brand-primary-disabled disabled:shadow-xs",
        ],
        "text-secondary": [
          "bg-transparent text-brand-secondary font-semibold",
          "hover:text-brand-secondary-hover hover:bg-brand-secondary-alt",
          "active:text-brand-secondary-active active:bg-brand-secondary-alt",
          "disabled:text-disabled disabled:border-brand-secondary-disabled disabled:shadow-xs",
        ],
        "text-success": [
          "bg-transparent text-success font-semibold",
          "hover:text-success-hover hover:bg-success-alt",
          "active:text-success-active active:bg-success-alt",
          "disabled:text-disabled disabled:border-success-disabled disabled:shadow-xs",
        ],
        "text-warning": [
          "bg-transparent text-warning font-semibold",
          "hover:text-warning-hover hover:bg-warning-alt",
          "active:text-warning-active active:bg-warning-alt",
          "disabled:text-disabled disabled:border-warning-disabled disabled:shadow-xs",
        ],
        "text-error": [
          "bg-transparent text-error font-semibold",
          "hover:text-error-hover hover:bg-error-alt",
          "active:text-error-active active:bg-error-alt",
          "disabled:text-disabled disabled:border-error-disabled disabled:shadow-xs",
        ],
        "text-gray": [
          "bg-transparent text-neutral-700 font-semibold",
          "hover:text-white hover:bg-neutral-500",
          "active:text-neutral-active active:bg-neutral-500",
          "disabled:text-disabled disabled:border-neutral-100 disabled:shadow-xs",
        ],
        "text-dark": [
          "bg-transparent text-black font-semibold",
          "hover:text-white hover:bg-neutral-900",
          "active:text-black-active active:bg-neutral-900",
          "disabled:text-disabled disabled:border-black-disabled disabled:shadow-xs",
        ],
      },
      size: {
        xs: ["px-lg py-sm body-md rounded", "gap-xs"],
        sm: ["px-xl py-md body-md rounded", "gap-xs"],
        md: ["!px-[14px] py-lg body-md rounded", "gap-sm"],
        lg: ["px-2xl py-lg text-lg rounded", "gap-sm"],
        xl: ["px-[18px] py-xl text-lg rounded", "gap-sm"],
      },
      iconOnly: {
        true: "!p-lg rounded-full",
        false: "",
      },
      loading: {
        true: "!text-gray !cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "contained-primary",
      size: "md",
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, only renders the icon without text
   */
  iconOnly?: boolean;
  /**
   * Icon to display at the start (left) of the button
   */
  startIcon?: Icon | ReactNode;
  /**
   * Icon to display at the end (right) of the button
   */
  endIcon?: Icon | ReactNode;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Loading icon/spinner
   */
  loadingIcon?: Icon;
  /**
   * Icon variant
   */
  iconWeight?: IconWeight;
}

const getIconSize = (size: "xs" | "sm" | "md" | "lg" | "xl", iconOnly: boolean) => {
  if (!iconOnly) {
    return 16.67;
  }

  switch (size) {
    case "xs":
    case "sm":
    case "md":
    case "lg":
    case "xl":
    default:
      return 20;
  }
};

const renderIcon = (
  IconComponent: Icon | ReactNode,
  size: "xs" | "sm" | "md" | "lg" | "xl",
  iconWeight: IconWeight,
  iconOnly: boolean
) => {
  const iconSize = getIconSize(size, iconOnly);
  if (isValidElement(IconComponent)) {
    return IconComponent;
  }

  const Icon = IconComponent as Icon;
  return <Icon size={iconSize} weight={iconWeight} />;
};

const LoadingSpinner = ({ size = "sm" }: { size?: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-5 h-5",
  };

  return (
    <svg
      className={cn("animate-spin", sizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const Button = ({
  className,
  variant,
  size,
  iconOnly = false,
  startIcon,
  endIcon,
  loading = false,
  loadingIcon,
  children,
  disabled,
  ref,
  iconWeight = "regular",
  ...props
}: ButtonProps & { ref?: Ref<HTMLButtonElement> }) => {
  const isDisabled = disabled || loading;
  const buttonSize = size || "md";
  const hasText = !iconOnly && children;
  const iconOnlyIcon = iconOnly ? startIcon || endIcon : null;
  const showLoadingIcon =
    loading &&
    (loadingIcon ? (
      renderIcon(loadingIcon, buttonSize, iconWeight, iconOnly)
    ) : (
      <LoadingSpinner size={buttonSize} />
    ));

  return (
    <button
      className={cn(buttonVariants({ variant, size, iconOnly, loading }), className)}
      ref={ref}
      disabled={isDisabled}
      {...props}
    >
      {showLoadingIcon}

      {!loading &&
        !iconOnly &&
        startIcon &&
        renderIcon(startIcon, buttonSize, iconWeight, iconOnly)}

      {hasText && children}

      {!loading && !iconOnly && endIcon && renderIcon(endIcon, buttonSize, iconWeight, iconOnly)}

      {!loading &&
        iconOnly &&
        iconOnlyIcon &&
        renderIcon(iconOnlyIcon, buttonSize, iconWeight, iconOnly)}
    </button>
  );
};

Button.displayName = "Button";

export { buttonVariants };
export type { ButtonProps as ButtonVariantProps };
