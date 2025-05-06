"use client";
import { useState } from "react";

import { fetcherWc } from "@/helper";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TwoFactorSetup() {
  const [qrCode, setQrCode] = useState<string>();
  const [token, setToken] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const link = await fetcherWc("/generateSecret", "GET");
      setQrCode(link);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    try {
      setLoading(true);
      const { success } = await fetcherWc("/otpVerify", "POST", { otp: token });

      setLoading(false);
      setIsVerified(success);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Two-Factor Authentication
        </h2>
        {!qrCode ? (
          <button
            onClick={generateQRCode}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            {loading ? "Generating..." : "Enable 2FA"}
          </button>
        ) : (
          <>
            <div className="flex justify-center">
              <Image src={qrCode} alt="QR Code" width={192} height={192} />
            </div>
            <div className="text-sm text-gray-500 text-center">
              Scan the QR code above using Google Authenticator or Authy.
            </div>

            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Button
              onClick={verifyToken}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 mt-3 rounded-lg font-semibold transition"
            >
              Verify Code {loading && <Loader2 className="animate-spin" />}
            </Button>
            {isVerified && (
              <div className="text-green-600 font-semibold text-center mt-2">
                ✅ Verified successfully!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
