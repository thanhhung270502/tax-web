"use client";

import { useState } from "react";
import { PlusIcon, UploadIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { useUploadDialog } from "../../hooks";
import { useCreateFolder } from "../../hooks/use-create-folder";

import { CreateFolder } from "./create-folder";
import { UploadModal } from "./upload-modal";

type UploadComponentProps = {
  folderId?: string;
  loginSession: TLoginSession;
};

export const UploadComponent = ({ folderId, loginSession }: UploadComponentProps) => {
  const [open, setOpen] = useState(false);
  const createFolder = useCreateFolder({ folderId, loginSession });
  const uploadDialog = useUploadDialog({ folderId, loginSession });

  const handleStartCreatingFolder = () => {
    setOpen(false);
    createFolder.setOpen(true);
  };

  const handleStartUploadingFiles = () => {
    setOpen(false);
    uploadDialog.setOpen(true);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onClick={(e) => e.stopPropagation()}
          render={
            <Button
              type="button"
              variant="secondary"
              startIcon={PlusIcon}
              className="p-md! w-fit"
              iconOnly
            />
          }
        />
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={8}
          popupClassName={cn(
            "bg-white flex flex-col rounded-md shadow-lg gap-xxs border border-secondary",
            "w-[15.625rem]"
          )}
        >
          <div className={cn("gap-sm py-sm flex flex-col overflow-y-auto", "max-h-100")}>
            <ItemActionContentItem
              icon={<PlusIcon size={20} />}
              label="Create Folder"
              onClick={handleStartCreatingFolder}
            />
            <ItemActionContentItem
              icon={<UploadIcon size={20} />}
              label="Upload Files"
              onClick={handleStartUploadingFiles}
            />
          </div>
        </PopoverContent>
      </Popover>
      <CreateFolder {...createFolder} />
      <UploadModal {...uploadDialog} />
    </>
    // <div className="p-2xl">
    //   <UploadModal {...uploadDialog} />
    // </div>
  );
};

type ItemActionContentItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isLoading?: boolean;
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
