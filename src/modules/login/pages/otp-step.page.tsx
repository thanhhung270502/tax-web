import { useWatch } from "react-hook-form";

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
        <div className="bg-gradient-brand-secondary m-auto flex size-20 items-center justify-center rounded-lg text-3xl">
          🔐
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
