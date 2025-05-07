"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

export default function OtpModal({
  open,
  setOpen,
  email,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}) {
  const [otp, setOtp] = useState("");
  const { utype, login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (code: string) => {
      try {
        const data = await fetcherWc("/otpInput", "POST", { otp: code, email });

        if (data.message === "Login successful") {
          if (data.user.role.toLowerCase() !== utype) {
            toast(`u r not authorised`);
            return;
          }
          login(data.user);
          toast("Login Successfully");
          router.push("/admin");
        } else toast.error("error happened");
      } catch (error) {
        toast.error("error block happened");
        console.log(error);
      }
    },
    [email, login, router, utype]
  );

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit(otp);
    }
  }, [otp, handleSubmit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay
        className={cn(
          "fixed inset-0 z-50 bg-black/10 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out"
        )}
      />
      <DialogContent
        className={cn(
          "fixed bottom-0 left-1/2 z-50 w-full max-w-md translate-x-[-50%] rounded-t-2xl bg-white p-6 shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom"
        )}
      >
        <DialogTitle></DialogTitle>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Enter 2FA Code</h2>
          <p className="text-sm text-gray-500">
            Enter the 6-digit code from your authenticator app
          </p>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            containerClassName="justify-center gap-3 mt-4"
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </DialogContent>
    </Dialog>
  );
}
