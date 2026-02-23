"use client";

import { cn } from "@tailwind-config/utils/cn";

import { Button, FormProvider, RHFInput, RHFSelect } from "@/shared";

import {
  AccountTypeOptions,
  CountryOptions,
  FilingStatusOptions,
  LanguageOptions,
} from "../constants";
import type { UseProfileReturn } from "../hooks";

const dimensions = "max-h-[calc(100vh-300px)] overflow-y-auto";

type ProfileFormProps = UseProfileReturn;

export const ProfileForm = ({ methods, onSubmit }: ProfileFormProps) => {
  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <div className={cn("gap-2xl px-6xl py-4xl flex flex-col", dimensions)}>
        <div className="gap-2xl grid grid-cols-2">
          <RHFSelect
            name="accountType"
            control={methods.control}
            options={AccountTypeOptions}
            label="Account Type"
            placeholder="Select Account Type"
            size="sm"
          />
          <RHFSelect
            name="language"
            control={methods.control}
            options={LanguageOptions}
            label="Language"
            placeholder="Select Language"
            size="sm"
          />
          <RHFInput
            name="firstName"
            control={methods.control}
            label="First Name"
            placeholder="Enter your first name"
            size="sm"
          />
          <RHFInput
            name="lastName"
            control={methods.control}
            label="Last Name"
            placeholder="Enter your last name"
            size="sm"
          />
        </div>
        <RHFInput
          name="phone"
          control={methods.control}
          label="Phone"
          placeholder="Enter your phone number"
          size="sm"
        />
        <RHFInput
          name="ssn"
          control={methods.control}
          label="Social Security Number"
          placeholder="Enter your Social Security Number"
          size="sm"
        />
        <RHFInput
          name="dob"
          control={methods.control}
          label="Date of Birth"
          placeholder="Enter your date of birth"
          size="sm"
        />
        <RHFSelect
          name="filingStatus"
          control={methods.control}
          options={FilingStatusOptions}
          label="Filing Status"
          placeholder="Select Filing Status"
          size="sm"
        />
        <RHFSelect
          name="country"
          control={methods.control}
          options={CountryOptions}
          label="Country"
          placeholder="Select Country"
          size="sm"
        />
        <RHFInput
          name="address"
          control={methods.control}
          label="Address"
          placeholder="Enter your address"
          size="sm"
        />
        <RHFInput
          name="state"
          control={methods.control}
          label="State"
          placeholder="Enter your state"
          size="sm"
        />
        <RHFInput
          name="city"
          control={methods.control}
          label="City"
          placeholder="Enter your city"
          size="sm"
        />
        <RHFInput
          name="zipcode"
          control={methods.control}
          label="Zipcode"
          placeholder="Enter your zipcode"
          size="sm"
        />
        {/* <Button type="submit">Submit</Button> */}
      </div>
      <div className="px-6xl py-4xl border-secondary border-t">
        <Button variant="contained-secondary" className="w-full">
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};
