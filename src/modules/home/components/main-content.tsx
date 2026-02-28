import { BaseHandlerAction } from "@common";

import { Spinner, Typography, useGetListFolders } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { FolderItem } from ".";

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

  const folders = data?.items || [];
  // const data: GetListFoldersResponse = {
  //   success: true,
  //   folderId: "1NIgAYKEOblugAEU3Qxu-h7MYamXVuPb4",
  //   folderName: "thanhhung270502@gmail.com",
  //   parentId: "1pfOq2353JhsT1rVc7dgKlcbZCq50yOJ1",
  //   items: [
  //     {
  //       id: "1e-keVlF-xLHfEmGlHrCx_RF92PU4zv_E",
  //       name: "2025",
  //       type: "folder",
  //       createdAt: "2026-02-25T12:57:38.025Z",
  //       updatedAt: "2026-02-25T12:57:38.025Z",
  //     },
  //     {
  //       id: "17xTyWQMTIFxru91KCw4kxKdye8gOTGC6",
  //       name: "2026",
  //       type: "folder",
  //       createdAt: "2026-02-25T12:57:38.915Z",
  //       updatedAt: "2026-02-25T12:57:38.915Z",
  //     },
  //   ],
  // };

  if (isLoading) {
    return (
      <div className="gap-2xl p-4xl flex flex-col items-center justify-center">
        <Spinner size="lg" />
        <Typography variant="body-lg" color="secondary">
          Loading folders...
        </Typography>
      </div>
    );
  }

  return (
    <div className="gap-2xl p-2xl grid flex-1 grid-cols-4 overflow-y-auto">
      {folders.map((item) => (
        <FolderItem key={item.id} folder={item} />
      ))}
    </div>
  );
};
