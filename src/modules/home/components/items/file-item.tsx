import { useState } from "react";
import type { TFileItem } from "@common";
import { cn } from "@tailwind-config/utils/cn";

import { formatDate, Typography } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { ItemAction, PreviewFile, RendererFileIcon, RendererFileName } from "..";

const FORMAT_DATE = "MM/DD/YYYY HH:mm";

type FileItemProps = {
  file: TFileItem;
  loginSession: TLoginSession;
};

export const FileItem = ({ file, loginSession }: FileItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
        onClick={handleOpen}
        className={cn(
          "group pl-2xl p-lg relative flex cursor-pointer flex-col gap-2 rounded-xl transition-all",
          "bg-secondary",
          "hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
        )}
      >
        <div className="gap-md flex items-center">
          <RendererFileIcon fileName={file.name} size="sm" className="min-h-9 min-w-9" />
          <div className="flex grow flex-col">
            <RendererFileName fileName={file.name} className="grow" />
            <Typography variant="body-sm" className="text-secondary">
              {formatDate(file.updatedAt, FORMAT_DATE)}
            </Typography>
          </div>
          <ItemAction item={file} loginSession={loginSession} />
        </div>
      </div>
      <PreviewFile
        file={file}
        open={open}
        setOpen={setOpen}
        email={loginSession.email}
        sessionToken={loginSession.sessionToken}
      />
    </>
  );
};
