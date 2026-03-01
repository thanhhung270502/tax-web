import { cn } from "@tailwind-config/utils/cn";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared";
import { SHEET_DIMENSIONS } from "@/shared/constants";

type BaseMobileProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  renderTrigger?: React.ReactElement<
    Record<string, unknown>,
    string | React.JSXElementConstructor<any>
  >;
};

export const BaseMobile = (props: BaseMobileProps) => {
  const { open, setOpen, title, children, renderTrigger } = props;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {renderTrigger ? <SheetTrigger asChild>{renderTrigger}</SheetTrigger> : null}
      <SheetContent
        side="bottom"
        className={cn(
          SHEET_DIMENSIONS.DEFAULT,
          "gap-0 overflow-x-hidden overflow-y-auto rounded-t-2xl bg-white"
        )}
        showOverlay
      >
        <SheetHeader className="px-4xl py-xl border-secondary border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">Edit the info configuration</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
