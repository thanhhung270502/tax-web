import { useRouter } from "@bprogress/next/app";
import type { TFolderItem } from "@common";
import { FolderIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { ClientRoutes, formatDate, getDetailRoute, Typography } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { ItemAction, RendererFileName } from "..";

const FORMAT_DATE = "MM/DD/YYYY HH:mm";

type FolderItemProps = {
  folder: TFolderItem;
  loginSession: TLoginSession;
};

export const FolderItem = ({ folder, loginSession }: FolderItemProps) => {
  const router = useRouter();

  const handleNavigateToFolder = () => {
    router.push(getDetailRoute(ClientRoutes.Folder, folder.id));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
      onClick={handleNavigateToFolder}
      className={cn(
        "group pl-2xl p-lg relative flex cursor-pointer flex-col gap-2 rounded-xl transition-all",
        "bg-secondary",
        "hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
      )}
    >
      <div className="gap-md flex items-center">
        <FolderIcon weight="fill" className="min-h-9 min-w-9 text-blue-500" />
        <div className="flex grow flex-col">
          <RendererFileName fileName={folder.name} className="grow" />
          <Typography variant="body-sm" className="text-secondary">
            {formatDate(folder.updatedAt, FORMAT_DATE)}
          </Typography>
        </div>
        <ItemAction item={folder} loginSession={loginSession} />
      </div>
    </div>
  );
};
