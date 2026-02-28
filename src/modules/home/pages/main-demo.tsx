"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ClipboardTextIcon,
  DotsThreeVerticalIcon,
  FolderIcon,
  FolderSimpleIcon,
  GearIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

type NavItem = {
  icon: React.ElementType;
  label: string;
  key: string;
};

const NAV_ITEMS: NavItem[] = [
  { icon: FolderSimpleIcon, label: "Files", key: "files" },
  { icon: ClipboardTextIcon, label: "Tasks", key: "tasks" },
  { icon: GearIcon, label: "Settings", key: "settings" },
];

type FolderItemData = {
  id: string;
  name: string;
  updatedAt: string;
};

const MOCK_FOLDERS: FolderItemData[] = [
  { id: "1", name: "Individual", updatedAt: "02/24/2026 19:44" },
  { id: "2", name: "Business", updatedAt: "02/20/2026 10:30" },
  { id: "3", name: "Corporate", updatedAt: "02/18/2026 14:22" },
  { id: "4", name: "Partnership", updatedAt: "02/15/2026 09:10" },
];

export const MainDemoPage = () => {
  const [activeNav, setActiveNav] = useState("files");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMenuToggle = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="flex h-screen bg-white"
      role="presentation"
      onKeyDown={() => setOpenMenuId(null)}
      onClick={() => setOpenMenuId(null)}
    >
      {/* ── Left Sidebar ── */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="border-b border-gray-100 px-4 py-5">
          <p className="text-center text-xl leading-none font-black tracking-tight text-gray-900">
            x<span className="text-blue-600">247</span>
          </p>
          <p className="text-center text-[10px] font-bold tracking-[0.25em] text-blue-600">
            SERVICES
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2">
          {NAV_ITEMS.map(({ icon: Icon, label, key }) => {
            const isActive = activeNav === key;
            return (
              <button
                key={key}
                onClick={() => setActiveNav(key)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-r-2 border-blue-600 bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-100 py-3 text-center">
          <p className="text-2xl leading-none font-black tracking-tight text-gray-900">
            x<span className="text-blue-600">247</span>
          </p>
          <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600">SERVICES</p>
        </header>

        {/* Breadcrumb */}
        <div className="flex items-center border-b border-gray-100 px-4 py-2.5">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900">
            <ArrowLeftIcon size={16} weight="bold" />
            2024
          </button>
        </div>

        {/* Folder Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {MOCK_FOLDERS.map((folder) => (
              <div
                key={folder.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
                onClick={(e) => e.stopPropagation()}
                className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
              >
                {/* Three-dot menu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle(folder.id);
                  }}
                  className="absolute top-2 right-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-700"
                  aria-label="More options"
                >
                  <DotsThreeVerticalIcon size={16} weight="bold" />
                </button>

                {/* Dropdown menu */}
                {openMenuId === folder.id && (
                  <div
                    role="menu"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="absolute top-8 right-2 z-10 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    <button
                      role="menuitem"
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Rename
                    </button>
                    <button
                      role="menuitem"
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Folder icon */}
                <FolderIcon size={56} weight="duotone" className="text-blue-500" />

                {/* Folder info */}
                <div className="w-full text-center">
                  <p className="truncate text-sm font-medium text-gray-800">{folder.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{folder.updatedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          className="absolute right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
          aria-label="Add new folder"
        >
          <PlusIcon size={24} weight="bold" />
        </button>
      </main>
    </div>
  );
};
