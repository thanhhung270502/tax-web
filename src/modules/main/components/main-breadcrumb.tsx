"use client";

import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

import { Breadcrumb, BreadcrumbItem } from "@/shared";

const MOCK_BREADCRUMB_ITEMS = [
  {
    label: "2024",
    icon: <ArrowLeftIcon size={16} weight="bold" />,
    href: "/",
    onClick: () => {},
    active: false,
  },
  {
    label: "2025",
    icon: <ArrowRightIcon size={16} weight="bold" />,
    href: "/",
    onClick: () => {},
    active: true,
  },
];

interface MainBreadcrumbProps {
  /**
   * Breadcrumb items to display
   */
  breadcrumbItems?: Array<{
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;
  /**
   * Custom breadcrumb separator
   */
  breadcrumbSeparator?: ReactNode;
  /**
   * Whether to show the breadcrumb
   */
  showBreadcrumb?: boolean;
}

export const MainBreadcrumb = ({
  breadcrumbItems = MOCK_BREADCRUMB_ITEMS,
  breadcrumbSeparator,
  showBreadcrumb = true,
}: MainBreadcrumbProps) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Breadcrumb */}
      {showBreadcrumb && breadcrumbItems.length > 0 && (
        <Breadcrumb separator={breadcrumbSeparator}>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem
              key={index}
              icon={item.icon}
              href={item.href}
              onClick={item.onClick}
              active={item.active}
            >
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
    </div>
  );
};
