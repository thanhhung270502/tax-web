"use client";

import { useRouter } from "@bprogress/next/app";

import { ClientRoutes, STORAGE_KEYS } from "@/shared";
import { StorageService } from "@/shared/services";
import type { TLoginSession } from "@/shared/types";

import { MainBreadcrumb, MainContent, UploadComponent } from "../components";

type HomePageProps = {
  folderId?: string;
};

export const HomePage = ({ folderId }: HomePageProps) => {
  const router = useRouter();
  const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
  if (loginSession.isEmpty) {
    router.push(ClientRoutes.Login);
    return null;
  }

  const loginSessionData = loginSession.value
    ? (loginSession.value as unknown as TLoginSession)
    : null;

  if (!loginSessionData) {
    router.push(ClientRoutes.Login);
    return null;
  }

  return (
    <div className="bg-secondary p-2xl flex h-screen grow flex-col">
      <div className="flex flex-col rounded-lg bg-white">
        <div className="gap-xl pr-2xl flex items-center justify-between">
          <MainBreadcrumb folderId={folderId} loginSession={loginSessionData} />
          <UploadComponent folderId={folderId} loginSession={loginSessionData} />
        </div>
        <MainContent folderId={folderId} loginSession={loginSessionData} />
      </div>
    </div>
  );
};
