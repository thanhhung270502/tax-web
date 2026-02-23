"use client";

import { useEffect, useState } from "react";

import { Typography } from "@/shared";

export const Timer = () => {
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
    <Typography
      variant="body-md"
      weight="semibold"
      className="text-brand-secondary cursor-pointer text-center hover:underline"
      onClick={handleResend}
    >
      Resend Code
    </Typography>
  );
};
