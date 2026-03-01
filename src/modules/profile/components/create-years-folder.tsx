"use client";

import { useWatch } from "react-hook-form";
import { cn } from "@tailwind-config/utils/cn";

import { Button, Checkbox, FormProvider, Typography } from "@/shared";
import type { TLoginSession } from "@/shared/types";

import { useCreateYearsFolder } from "../hooks/use-creat-years-folder";

const dimensions = "max-h-[calc(100vh-300px)] overflow-y-auto";

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear - i);
  }

  return years;
};

type CreateYearsFolderProps = {
  loginSession: TLoginSession;
};

export const CreateYearsFolder = ({ loginSession }: CreateYearsFolderProps) => {
  const createYearsFolderMethods = useCreateYearsFolder({ loginSession });
  const { methods, onSubmit, isLoading } = createYearsFolderMethods;
  const yearGenerated = generateYears();

  const years = useWatch({ control: methods.control, name: "years" });

  const handleCheck = (year: number) => {
    const years = methods.getValues("years");
    if (years.includes(year)) {
      methods.setValue(
        "years",
        years.filter((y: number) => y !== year)
      );
    } else {
      methods.setValue("years", [...years, year]);
    }
  };

  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <div className={cn("gap-xl px-6xl py-4xl flex flex-col", dimensions)}>
        <Typography variant="body-sm">
          For which tax years would you like to file returns?
        </Typography>
        {yearGenerated.map((year) => (
          <Checkbox
            key={year}
            checked={years.includes(year)}
            onCheckedChange={() => handleCheck(year)}
            label={year.toString()}
          />
        ))}
      </div>
      <div className="px-6xl py-4xl border-secondary border-t">
        <Button variant="secondary" className="w-full" loading={isLoading}>
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};
