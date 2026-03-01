import { BaseHandlerAction, EFileOrFolderType } from "@common";
import { ClipboardTextIcon } from "@phosphor-icons/react";

import { Loading, Typography, useGetListFolders } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { FileItem, FolderItem } from ".";

type MainContentProps = {
  loginSession: TLoginSession;
  folderId?: string;
};

export const MainContent = ({ loginSession, folderId }: MainContentProps) => {
  const { data, isLoading } = useGetListFolders({
    input: {
      action: BaseHandlerAction.GET_LIST_FOLDERS,
      email: loginSession.email,
      sessionToken: loginSession.sessionToken,
      folderId,
    },
  });

  const folders = (data?.items || []).filter((item) => item.type === EFileOrFolderType.FOLDER);

  const files = (data?.items || []).filter((item) => item.type === EFileOrFolderType.FILE);

  if (isLoading) {
    return (
      <div className="gap-2xl p-4xl flex flex-col items-center justify-center">
        <Loading size="xl" text="Loading..." className="gap-xl" />
      </div>
    );
  }

  if (folders.length === 0 && files.length === 0) {
    return (
      <div className="gap-2xl p-4xl flex flex-col items-center justify-center">
        <ClipboardTextIcon size={40} className="text-secondary" />
        <Typography variant="body-md" color="primary">
          Create a new folder or upload a file to get started.
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-2xl gap-4xl flex flex-1 flex-col overflow-y-auto">
      {folders.length > 0 && (
        <div className="gap-2xl flex flex-col">
          <Typography variant="body-md" color="primary" weight="semibold">
            Folders
          </Typography>
          <div className="gap-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {folders.map((item) => (
              <FolderItem key={item.id} folder={item} loginSession={loginSession} />
            ))}
          </div>
        </div>
      )}
      {files.length > 0 && (
        <div className="gap-2xl flex flex-col">
          <Typography variant="body-md" color="primary" weight="semibold">
            Files
          </Typography>
          <div className="gap-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((item) => (
              <FileItem key={item.id} file={item} loginSession={loginSession} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
