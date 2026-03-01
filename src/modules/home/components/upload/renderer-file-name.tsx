import { cn } from "@tailwind-config/utils/cn";

import { EUploadFileStatus, Tooltip, TooltipContent, TooltipTrigger } from "@/shared";
import { Typography } from "@/shared";

type RendererFileNameProps = {
  fileName: string;
  status?: EUploadFileStatus;
  className?: string;
};

export const RendererFileName = ({ fileName, status, className }: RendererFileNameProps) => {
  const getStatusColor = () => {
    switch (status) {
      case EUploadFileStatus.UPLOADING:
        return "text-brand-tertiary";
      case EUploadFileStatus.SUCCESS:
        return "text-success-600";
      case EUploadFileStatus.ERROR:
        return "text-error-600";
      default:
        return "text-primary";
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div className="min-w-0 flex-1">
            <Typography
              variant="body-sm"
              className={cn(
                "line-clamp-1 font-medium whitespace-pre-line",
                getStatusColor(),
                className
              )}
            >
              {fileName}
            </Typography>
          </div>
        }
      />
      <TooltipContent>
        <Typography variant="body-sm">{fileName}</Typography>
      </TooltipContent>
    </Tooltip>
  );
};
