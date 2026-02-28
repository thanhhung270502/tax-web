"use client";

import { useWatch } from "react-hook-form";
import Image from "next/image";

import { CenterCard, Typography } from "@/shared";

import { VerifyOtp } from "../components";
import type { UseLoginReturn } from "../hooks";

type OtpStepPageProps = UseLoginReturn;

export const OtpStepPage = (props: OtpStepPageProps) => {
  const { methods } = props;
  const email = useWatch({ control: methods.control, name: "email" });

  return (
    <CenterCard>
      <div className="gap-4xl flex flex-col">
        <div className="flex items-center justify-center">
          <Image src={"/images/ktancpa-logo.png"} alt="Reviva" width={100} height={28} priority />
        </div>
        <div className="gap-xs flex flex-col items-center justify-center">
          <Typography variant="heading-xl" weight="semibold">
            Verify Email
          </Typography>
          <Typography variant="body-lg" color="secondary" className="text-center">
            We sent a code to{" "}
            <Typography as="span" variant="body-lg" color="secondary" weight="semibold">
              {email}
            </Typography>
          </Typography>
        </div>
        <VerifyOtp {...props} />
      </div>
    </CenterCard>
  );
};
