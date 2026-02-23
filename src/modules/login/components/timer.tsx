"use client";

import { useEffect, useState } from "react";

import { Button, Typography } from "@/shared";

export const Timer = ({ disabled }: { disabled: boolean }) => {
  const [timer, setTimer] = useState(60);

  const handleResend = () => {
    setTimer(60);
  };

  useEffect(() => {
    const id = timer > 0 ? setInterval(() => setTimer((t) => t - 1), 1000) : null;
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [timer]);

  if (timer > 0) {
    return (
      <Typography variant="body-md" className="text-center" color="disabled">
        Resend in {timer}s
      </Typography>
    );
  }
  return (
    <Button
      variant="text-secondary"
      className="cursor-pointer text-center hover:bg-transparent hover:underline"
      onClick={handleResend}
      disabled={disabled}
    >
      Resend Code
    </Button>
  );
};
