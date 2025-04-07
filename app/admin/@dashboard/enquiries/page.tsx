"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetcherWc } from "@/helper";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Image from "next/image";

interface idata {
  data: Notification[];
}
interface Notification {
  id: number;
  name: string;
  email: string;
  father: string;
  coName: string;
  dob: string;
  mobileNo: string;
  AddressLine: string;
  vill: string;
  po: string;
  ps: string;
  pin: string;
  state: string;
  dist: string;
  nationality: string;
  sex: string;
  category: string;
  idProof: string;
  idProofNo: string;
  eduqualification: string;
  bathroom: boolean;
  tradeLicense: string;
  squareFit: string;
  houseRoomNo: string;
  ImageLink: string;
  signatureLink: string;
  createdAt: string;
}

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [loading, setloading] = useState(false);

  const { isPending, error, data } = useQuery<idata>({
    queryKey: ["repoData"],
    queryFn: () => fetcherWc("/FetchAllEnquiry", "GET"),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending) {
    <Loader />;
    return;
  }

  if (error) return;

  const notifications = data.data;

  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
  };

  const verifyhandler = async () => {
    setloading(true);
    const email = selectedNotification!.email;
    const name = selectedNotification!.name;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/VerifyEnquiry?email=${email}&name=${name}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        toast(`Step ${data.step}: ${data.message}`);

        // Handle completion case
        if (data.step === 2) {
          toast("Process completed, closing connection.");
          setloading(false);
          setSelectedNotification(null);
          eventSource.close();
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  return (
    <motion.div
      className="min-w-4xl min-h-80vh] mx-auto p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enquiry</h2>
      </div>
      <div className="mt-4 space-y-2 h-full overflow-y-auto">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            className="notification flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all bg-gray-200 hover:bg-blue-200"
            onClick={() => openNotification(notif)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col max-h-20">
              <p className="font-semibold text-red-600">{notif.name}</p>
              <p className="font-bold">{notif.email}</p>
              <p className="text-xs text-gray-400">
                {new Date(notif.createdAt).toDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedNotification && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg max-w-5xl h-[90%] relative">
            <p className="text-3xl font-bold mb-2">Enquiry</p>
            <button
              className="absolute top-2 right-2 w-8 h-8 text-gray-600 rounded-full hover:text-red-500 hover:bg-gray-100"
              onClick={() => setSelectedNotification(null)}
            >
              <X className="mx-auto" size={20} />
            </button>
            <div className="w-full overflow-y-auto">
              <div className="grid grid-cols-2 w-full gap-2">
                {[
                  { label: "Applicant Name", value: selectedNotification.name },
                  { label: "Email ID", value: selectedNotification.email },
                  { label: "Father Name", value: selectedNotification.father },
                  { label: "C/O Name", value: selectedNotification.coName },
                  {
                    label: "Date of Birth",
                    value: new Date(selectedNotification.dob)
                      .toISOString()
                      .split("T")[0],
                  },
                  { label: "Mobile No", value: selectedNotification.mobileNo },
                  { label: "Address", value: selectedNotification.AddressLine },
                  { label: "Village", value: selectedNotification.vill },
                  { label: "Post Office", value: selectedNotification.po },
                  { label: "Police Station", value: selectedNotification.ps },
                  { label: "Pin Code", value: selectedNotification.pin },
                  { label: "State", value: selectedNotification.state },
                  { label: "District", value: selectedNotification.dist },
                  {
                    label: "Nationality",
                    value: selectedNotification.nationality,
                  },
                  { label: "Gender", value: selectedNotification.sex },
                  { label: "Category", value: selectedNotification.category },
                  { label: "ID Proof", value: selectedNotification.idProof },
                  {
                    label: "ID Proof No",
                    value: selectedNotification.idProofNo,
                  },
                  {
                    label: "Education Qualification",
                    value: selectedNotification.eduqualification,
                  },
                  {
                    label: "Bathroom",
                    value: selectedNotification.bathroom ? "Yes" : "No",
                  },
                  {
                    label: "Trade License",
                    value: selectedNotification.tradeLicense,
                  },
                  {
                    label: "Square Fit",
                    value: selectedNotification.squareFit,
                  },
                  {
                    label: "House Room No",
                    value: selectedNotification.houseRoomNo,
                  },
                ].map((field, index) => (
                  <div key={index} className="p-2">
                    <label className="font-semibold">{field.label}: </label>
                    <span className="text-wrap">{field.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center my-2 gap-5">
                <div>
                  <Image
                    src={selectedNotification.ImageLink}
                    alt="Uploaded image"
                    width={200}
                    height={200}
                    className="rounded shadow object-contain"
                  />
                  <p className="text-center mt-1">Applicant Image</p>
                </div>
                <div>
                  <Image
                    src={selectedNotification.signatureLink}
                    alt="Uploaded image"
                    width={200}
                    height={200}
                    className="rounded shadow object-contain"
                  />
                  <p className="text-center mt-1">Applicant Signature</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {new Date(selectedNotification.createdAt).toDateString()}
              </p>
            </div>
            <Button
              className="mt-5 bg-purple-700 hover:bg-purple-800"
              onClick={verifyhandler}
              disabled={loading}
            >
              Verify {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
