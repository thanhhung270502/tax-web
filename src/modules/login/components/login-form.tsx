"use client";

import { Button, FormProvider, RHFInput } from "@/shared";

import type { UseLoginReturn } from "../hooks";

type LoginFormProps = UseLoginReturn;

export const LoginForm = ({ methods, onSubmit, isSubmitting }: LoginFormProps) => {
  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <RHFInput
        name="email"
        control={methods.control}
        label="Email Address"
        placeholder="you@example.com"
      />
      <div className="pt-4xl">
        <Button variant="contained-secondary" className="w-full" loading={isSubmitting}>
          Continue
        </Button>
      </div>
    </FormProvider>
  );
};
