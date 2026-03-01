import type { TFileOrFolderItem } from "@common";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { useItemAction } from "../../hooks/use-item-action";
import { ItemActionContent } from "..";

const ITEM_ACTION_WIDTH = "w-[15.625rem]";

type ItemActionProps = {
  item: TFileOrFolderItem;
  loginSession: TLoginSession;
  triggerClassName?: string;
};

export const ItemAction = ({ item, loginSession, triggerClassName }: ItemActionProps) => {
  const itemActionMethods = useItemAction({ item, loginSession });
  const { open, setOpen } = itemActionMethods;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "focus-visible:outline-none",
          "flex items-center justify-center",
          "p-sm! size-8 cursor-pointer rounded-full border-0",
          "hover:bg-secondary text-tertiary bg-transparent",
          triggerClassName
        )}
      >
        <DotsThreeVerticalIcon size={"1.25rem"} />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        popupClassName={cn(
          "bg-white flex flex-col rounded-md shadow-lg gap-xxs border border-secondary",
          ITEM_ACTION_WIDTH
        )}
      >
        <ItemActionContent {...itemActionMethods} />
      </PopoverContent>
    </Popover>
  );
};
