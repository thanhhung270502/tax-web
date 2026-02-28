import { useRouter } from "@bprogress/next/app";
import type { TFolderItem } from "@common";
import { DotsThreeVerticalIcon, FolderIcon } from "@phosphor-icons/react";

import { ClientRoutes, formatDate, getDetailRoute } from "@/shared";

const FORMAT_DATE = "MM/DD/YYYY HH:mm";

type FolderItemProps = {
  folder: TFolderItem;
};

export const FolderItem = ({ folder }: FolderItemProps) => {
  const router = useRouter();

  const handleNavigateToFolder = () => {
    router.push(getDetailRoute(ClientRoutes.Folder, folder.id));
  };

  return (
    <div
      key={folder.id}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
      onClick={handleNavigateToFolder}
      className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
    >
      {/* Three-dot menu */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-2 right-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-700"
        aria-label="More options"
      >
        <DotsThreeVerticalIcon size={16} weight="bold" />
      </button>

      {/* Dropdown menu */}
      {/* {openMenuId === folder.id && (
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
      )} */}

      {/* Folder icon */}
      <FolderIcon size={56} weight="duotone" className="text-blue-500" />

      {/* Folder info */}
      <div className="w-full text-center">
        <p className="truncate text-sm font-medium text-gray-800">{folder.name}</p>
        <p className="mt-0.5 text-xs text-gray-400">{formatDate(folder.updatedAt, FORMAT_DATE)}</p>
      </div>
    </div>
  );
};
