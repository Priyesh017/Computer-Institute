"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPComponent = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP Verified Successfully!");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-center items-center bg-gray-950 py-6 rounded-2xl shadow-[0px_0px_2px_#d1d5db,0px_0px_16px_#f3f4f6] w-full max-w-sm border border-gray-700"
      >
        <span className="text-lg font-bold">Verify Email</span>
        <motion.div
          id="otpField"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <InputOTP
            value={otp}
            onChange={setOtp}
            className="mb-4"
            maxLength={6}
          >
            <InputOTPGroup>
              {[...Array(3)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="border-gray-600 bg-gray-800 text-white text-xl"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator className="text-white text-xl mx-2">
              -
            </InputOTPSeparator>
            <InputOTPGroup>
              {[...Array(3)].map((_, index) => (
                <InputOTPSlot
                  key={index + 3}
                  index={index + 3}
                  className="border-gray-600 bg-gray-800 text-white text-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={verifyOtp}
            className="w-fit bg-green-500 hover:bg-green-600 text-white mt-2 py-3 rounded-lg font-semibold tracking-wide transition"
          >
            Verify OTP
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OTPComponent;
