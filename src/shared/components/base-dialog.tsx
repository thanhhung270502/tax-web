"use client";

import type { RefObject } from "react";

import { useSmaller } from "../hooks";

import { BaseMobile } from "./base-mobile";
import { BaseModal } from "./base-modal";

export type BaseDialogRenderTrigger = React.ReactElement<
  Record<string, unknown>,
  string | React.JSXElementConstructor<any>
>;

type BaseDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  renderTrigger?: BaseDialogRenderTrigger;
  dialogClassName?: string;
  container?: HTMLElement | RefObject<HTMLElement | null> | null | undefined;
};

export const BaseDialog = (props: BaseDialogProps) => {
  const { open, setOpen, title, children, renderTrigger, dialogClassName, container } = props;
  const isMobile = useSmaller("sm");
  const Component = isMobile ? BaseMobile : BaseModal;
  return (
    <Component
      open={open}
      setOpen={setOpen}
      title={title}
      renderTrigger={renderTrigger}
      dialogClassName={dialogClassName}
      container={container}
    >
      {children}
    </Component>
  );
};
