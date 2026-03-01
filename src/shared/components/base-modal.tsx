import type { RefObject } from "react";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared";
import { MODAL_DIMENSIONS } from "@/shared/constants";

type BaseModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  renderTrigger?: React.ReactElement<
    Record<string, unknown>,
    string | React.JSXElementConstructor<any>
  >;
  dialogClassName?: string;
  container?: HTMLElement | RefObject<HTMLElement | null> | null | undefined;
};

export const BaseModal = (props: BaseModalProps) => {
  const { open, setOpen, title, children, renderTrigger, dialogClassName, container } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderTrigger ? <DialogTrigger render={renderTrigger} /> : null}
      <DialogContent className={cn(MODAL_DIMENSIONS.BASE, dialogClassName)} container={container}>
        <div className="py-xl px-4xl border-secondary flex items-center justify-between border-b">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose
            nativeButton={false}
            render={<XIcon size={"1.25rem"} className="text-quaternary cursor-pointer outline-0" />}
          />
        </div>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
