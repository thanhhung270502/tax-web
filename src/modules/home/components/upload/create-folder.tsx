import { cn } from "@tailwind-config/utils/cn";

import { BaseDialog, Button, FormProvider, RHFInput } from "@/shared";

import type { UseCreateFolderReturn } from "../../hooks/use-create-folder";

type CreateFolderProps = UseCreateFolderReturn;

export const CreateFolder = ({
  open,
  setOpen,
  onSubmit,
  methods,
  isLoading,
}: CreateFolderProps) => {
  return (
    <BaseDialog open={open} setOpen={setOpen} title="Create Folder">
      <FormProvider formMethods={methods} onSubmit={onSubmit}>
        <div className="px-4xl py-3xl gap-4xl flex flex-col">
          <RHFInput
            name="folderName"
            control={methods.control}
            label="Folder Name"
            placeholder="Enter folder name"
            required
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </div>
        <div className={cn("gap-lg px-4xl py-3xl border-secondary flex justify-start border-t")}>
          <Button type="submit" loading={isLoading}>
            Save
          </Button>
          <Button
            variant="secondary"
            disabled={isLoading}
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </FormProvider>
    </BaseDialog>
  );
};
