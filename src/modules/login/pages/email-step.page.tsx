"use client";

import Image from "next/image";

import { Typography } from "@/shared";
import { CenterCard } from "@/shared";

import { LoginForm } from "../components";
import type { UseLoginReturn } from "../hooks";

type EmailStepPageProps = UseLoginReturn;

export const EmailStepPage = (props: EmailStepPageProps) => {
  return (
    <CenterCard>
      <div className="gap-4xl flex flex-col">
        <div className="flex items-center justify-center">
          <Image src={"/images/ktancpa-logo.png"} alt="Reviva" width={100} height={28} priority />
        </div>
        <div className="gap-xs flex flex-col items-center justify-center">
          <Typography variant="heading-xl" weight="semibold">
            Welcome
          </Typography>
          <Typography variant="body-lg" color="secondary">
            Enter your email to get started
          </Typography>
        </div>
        <LoginForm {...props} />
      </div>
    </CenterCard>
  );
};
