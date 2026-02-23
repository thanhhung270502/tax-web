"use client";

import { useCallback, useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import { useRouter } from "@bprogress/next/app";
import { EmailHandlerAction } from "@common";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { logger } from "@/libs/logger";
import { Button, ClientRoutes, STORAGE_KEYS, useProfileHandlerMutation } from "@/shared";
import { StorageService } from "@/shared/services";

import { LoginSteps } from "../enums";
import type { UseLoginReturn } from "../hooks";

import { Timer } from ".";

type VerifyOtpProps = UseLoginReturn;

export const VerifyOtp = ({ methods, setStep }: VerifyOtpProps) => {
  const isVerifyingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const profileHandlerMutation = useProfileHandlerMutation();

  const otp = useWatch({ control: methods.control, name: "otp" });

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    methods.setValue("otp", newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
    if (index === 5 && value) {
      const firstInput = document.getElementById(`otp-input-0`);
      setTimeout(() => {
        firstInput?.focus();
      }, 200);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleBackToEmail = () => {
    setStep(LoginSteps.EMAIL);
  };

  const handleVerifyOtp = useCallback(async () => {
    try {
      const response = await profileHandlerMutation.mutateAsync({
        action: EmailHandlerAction.VERIFY_OTP,
        email: methods.getValues("email"),
        otp: otp.join(""),
      });
      if (response.success) {
        if (response.sessionToken) {
          const value = {
            email: methods.getValues("email"),
            sessionToken: response.sessionToken,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000),
          };
          StorageService.setItem(STORAGE_KEYS.LOGIN_SESSION, value);
        }
        setTimeout(() => {
          isVerifyingRef.current = false;
        }, 100);
        router.push(ClientRoutes.Profile);
        methods.reset();
      } else {
        setTimeout(() => {
          methods.setValue("otp", ["", "", "", "", "", ""]);
          isVerifyingRef.current = false;
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        methods.setValue("otp", ["", "", "", "", "", ""]);
        isVerifyingRef.current = false;
      }, 100);
      logger.error(`Failed to verify OTP: ${error}`);
    }
  }, [methods, otp, profileHandlerMutation, router]);

  // Auto-complete when OTP reaches 6 digits
  useEffect(() => {
    const currentOtp = otp.join("");
    if (currentOtp.length === 6 && !isVerifyingRef.current) {
      isVerifyingRef.current = true;
      handleVerifyOtp();
    }
  }, [handleVerifyOtp, otp]);

  // Focus container on mount to capture keyboard events
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const renderOtpDisplay = () => {
    return (
      <div className="gap-lg flex items-center justify-center">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "border-secondary flex size-14 items-center justify-center rounded-lg border-2 bg-white text-center text-2xl font-bold transition-all outline-none"
              // errorMessage ? "focus:border-error-subtle" : "focus:border-primary",
              // errorMessage && pin[index] === "" && "border-error"
            )}
            inputMode="numeric"
            autoComplete="off"
            maxLength={1}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="gap-2xl flex flex-col items-center justify-center">
      {renderOtpDisplay()}
      <Timer />
      <Button
        type="button"
        variant="text-gray"
        className="font-regular hover:text-gray-hover w-full hover:bg-transparent hover:underline"
        onClick={handleBackToEmail}
        startIcon={ArrowLeftIcon}
      >
        Back to Email
      </Button>
    </div>
  );
};
