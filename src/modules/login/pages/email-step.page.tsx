import { Typography } from "@/shared";
import { CenterCard } from "@/shared";

import { LoginForm } from "../components";
import type { UseLoginReturn } from "../hooks";

type EmailStepPageProps = UseLoginReturn;

export const EmailStepPage = (props: EmailStepPageProps) => {
  return (
    <CenterCard>
      <div className="gap-4xl flex flex-col">
        <div className="bg-gradient-brand-secondary m-auto flex size-20 items-center justify-center rounded-lg text-3xl">
          📧
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
