import { BaseHandlerAction, EFilePreviewType, type TFileItem } from "@common";
import { ClipboardTextIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import {
  Dialog,
  DialogClose,
  DialogContent,
  Loading,
  MODAL_DIMENSIONS,
  Typography,
  useGetFilePreview,
} from "@/shared";

import "./preview-file.css";

type PreviewFileProps = {
  file: TFileItem;
  open: boolean;
  setOpen: (open: boolean) => void;
  email: string;
  sessionToken: string;
};

export const PreviewFile = ({ file, open, setOpen, email, sessionToken }: PreviewFileProps) => {
  const { data, isLoading } = useGetFilePreview({
    input: {
      fileId: file.id,
      action: BaseHandlerAction.GET_FILE_PREVIEW,
      email,
      sessionToken,
    },
    enabled: open,
  });

  const renderContent = () => {
    if (isLoading)
      return (
        <Loading
          size="xl"
          text="Loading preview..."
          className="text-secondary"
          textClassName="text-secondary"
          iconClassName="text-secondary"
        />
      );
    if (!data)
      return (
        <div className="gap-sm flex h-full w-full flex-col items-center justify-center">
          <ClipboardTextIcon className="text-tertiary size-10" />
          <Typography variant="body-md" color="secondary">
            No preview available
          </Typography>
        </div>
      );
    if (data.previewType === EFilePreviewType.IMAGE) {
      return <img src={data.previewData} alt="Preview File" className="m-auto h-full rounded-sm" />;
    }
    if (data.previewType === EFilePreviewType.IFRAME) {
      return (
        <div className="preview-file-responsive">
          <iframe src={data.previewData} title="Preview File" />
        </div>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn("bg-white/10", MODAL_DIMENSIONS.PREVIEW_FILE)}>
        <div className="relative h-full w-full">
          <DialogClose
            nativeButton={false}
            render={
              <XIcon
                className={cn(
                  "p-md absolute top-4 left-4 z-10 size-8 cursor-pointer rounded-full outline-0",
                  "bg-white/50 text-black hover:bg-white/70"
                )}
              />
            }
          />
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
