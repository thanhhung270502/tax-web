"use client";

import { redirect } from "next/navigation";

import { ClientRoutes, STORAGE_KEYS } from "@/shared";
import { StorageService } from "@/shared/services";

export default function Page() {
  const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
  if (loginSession.isEmpty) {
    redirect(ClientRoutes.Login);
  }
  redirect(ClientRoutes.Home);
}
