"use client";

import { use } from "react";

import { HomePage } from "@/modules/home";

export default function Folder({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = use(params);
  return <HomePage folderId={folderId} />;
}
