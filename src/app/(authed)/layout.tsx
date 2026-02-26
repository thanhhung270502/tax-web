"use client";

import type { ReactNode } from "react";

import { AppSidebar, ClientOnly, SidebarProvider } from "@/shared";

export default function AuthedLayout({ children }: { children: ReactNode }) {
  return (
    <ClientOnly>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ClientOnly>
  );
}
