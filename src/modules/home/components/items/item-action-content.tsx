import { TrashIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Button } from "@/shared";

import type { UseItemActionReturn } from "../../hooks/use-item-action";

type ItemActionContentProps = UseItemActionReturn;

export const ItemActionContent = ({ handleRemove, isDeleting }: ItemActionContentProps) => {
  return (
    <div className={cn("gap-sm py-sm flex flex-col overflow-y-auto", "max-h-100")}>
      <ItemActionContentItem
        icon={<TrashIcon size={20} />}
        label="Remove"
        onClick={handleRemove}
        isLoading={isDeleting}
      />
    </div>
  );
};

type ItemActionContentItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isLoading: boolean;
};

const ItemActionContentItem = ({ icon, label, onClick, isLoading }: ItemActionContentItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(
        "px-lg py-md gap-md flex w-full cursor-pointer items-center justify-start rounded-none border-0 text-left font-medium",
        "text-secondary bg-white transition-colors",
        "hover:bg-brand-secondary-alt hover:text-brand-secondary"
      )}
      loading={isLoading}
    >
      {icon}
      <span className="body-sm">{label}</span>
    </Button>
  );
};
