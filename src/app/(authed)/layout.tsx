"use client";

import { type ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";

import { AppSidebar, ClientOnly, ClientRoutes, SidebarProvider, STORAGE_KEYS } from "@/shared";
import { StorageService } from "@/shared/services";

export default function AuthedLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
    if (loginSession.isEmpty) {
      redirect(ClientRoutes.Login);
    }
  }, []);

  return (
    <ClientOnly>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ClientOnly>
  );
}
