"use client";

import { defaultStyles, FileIcon } from "react-file-icon";
import { FolderIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { getFileExtensionFromName } from "@/shared";

const FILE_ICON_COLORS = {
  doc: { labelColor: "#1570ef", glyphColor: "#1570ef" },
  docx: { labelColor: "#1570ef", glyphColor: "#1570ef" },
  pdf: { labelColor: "#d92d20", glyphColor: "#d92d20" },
  txt: { labelColor: "#717680", glyphColor: "#717680" },
  rtf: { labelColor: "#1570ef", glyphColor: "#1570ef" },

  xls: { labelColor: "#079455", glyphColor: "#079455" },
  xlsx: { labelColor: "#079455", glyphColor: "#079455" },
  csv: { labelColor: "#079455", glyphColor: "#079455" },

  ppt: { labelColor: "#e04f16", glyphColor: "#e04f16" },
  pptx: { labelColor: "#e04f16", glyphColor: "#e04f16" },

  jpg: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  jpeg: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  png: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  gif: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  svg: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  webp: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  bmp: { labelColor: "#7364e1", glyphColor: "#7364e1" },
  ico: { labelColor: "#7364e1", glyphColor: "#7364e1" },

  mp4: { labelColor: "#f79009", glyphColor: "#f79009" },
  mov: { labelColor: "#f79009", glyphColor: "#f79009" },
  avi: { labelColor: "#f79009", glyphColor: "#f79009" },
  mkv: { labelColor: "#f79009", glyphColor: "#f79009" },
  webm: { labelColor: "#f79009", glyphColor: "#f79009" },

  mp3: { labelColor: "#0e9384", glyphColor: "#0e9384" },
  wav: { labelColor: "#0e9384", glyphColor: "#0e9384" },
  ogg: { labelColor: "#0e9384", glyphColor: "#0e9384" },
  flac: { labelColor: "#0e9384", glyphColor: "#0e9384" },

  zip: { labelColor: "#535862", glyphColor: "#535862" },
  rar: { labelColor: "#535862", glyphColor: "#535862" },
  "7z": { labelColor: "#535862", glyphColor: "#535862" },
  tar: { labelColor: "#535862", glyphColor: "#535862" },
  gz: { labelColor: "#535862", glyphColor: "#535862" },

  // Code - Blue variations
  js: { labelColor: "#f79009", glyphColor: "#f79009" },
  ts: { labelColor: "#1570ef", glyphColor: "#1570ef" },
  jsx: { labelColor: "#53b1fd", glyphColor: "#53b1fd" },
  tsx: { labelColor: "#1570ef", glyphColor: "#1570ef" },
  html: { labelColor: "#e04f16", glyphColor: "#e04f16" },
  css: { labelColor: "#1570ef", glyphColor: "#1570ef" },
  json: { labelColor: "#717680", glyphColor: "#717680" },
  xml: { labelColor: "#e04f16", glyphColor: "#e04f16" },
} as const;

const DEFAULT_LABEL_COLOR = "#717680"; // neutral-500

type RendererFileIconProps = {
  fileName: string;
  isFolder?: boolean;
  size?: "sm" | "md" | "lg";
  iconSize?: number;
  className?: string;
};

const SIZE_MAP = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const FOLDER_ICON_SIZE_MAP = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const RendererFileIcon = ({
  fileName,
  isFolder = false,
  size = "md",
  iconSize = 20,
  className,
}: RendererFileIconProps) => {
  const _iconSize = iconSize || FOLDER_ICON_SIZE_MAP[size];
  if (isFolder) {
    return (
      <div
        className={`bg-warning-100 text-warning-600 flex items-center justify-center rounded-lg ${SIZE_MAP[size]}`}
      >
        <FolderIcon size={_iconSize} />
      </div>
    );
  }

  const extension = getFileExtensionFromName(fileName) || "jpg";
  const defaultStyle = defaultStyles[extension as keyof typeof defaultStyles] || {};
  const colorConfig = FILE_ICON_COLORS[extension as keyof typeof FILE_ICON_COLORS];

  return (
    <div className={cn("flex items-center justify-center", SIZE_MAP[size], className)}>
      <FileIcon
        extension={extension}
        {...defaultStyle}
        labelColor={colorConfig?.labelColor || DEFAULT_LABEL_COLOR}
        glyphColor={colorConfig?.glyphColor || DEFAULT_LABEL_COLOR}
      />
    </div>
  );
};
