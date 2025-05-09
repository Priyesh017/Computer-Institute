"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  verified: boolean;
  certificateLink?: string;
}

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [loading, setloading] = useState<
    "verify" | "update" | "generate" | null
  >(null);
  const [deleteloading, setdeleteloading] = useState<number | null>(null);

  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState<Notification>();

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery<idata>({
    queryKey: ["repoData"],
    queryFn: () => fetcherWc("/FetchAllEnquiry", "GET"),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const deletehandler = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      setdeleteloading(id);
      return fetcherWc("/deleteEnquiry", "DELETE", { id });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["repoData"] }),
    onSettled: () => setdeleteloading(null),
  });

  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
    setEditedData({ ...notif }); // clone for editing
    setEditable(false); // default to not editable
  };

  const verifyhandler = async () => {
    setloading("verify");
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
          setloading(null);
          setSelectedNotification(null);
          eventSource.close();
          queryClient.invalidateQueries({ queryKey: ["repoData"] });
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

  const savehandler = async () => {
    try {
      setloading("update");
      const data = await fetcherWc(
        `/updateEnquiry/${selectedNotification!.id}`,
        "POST",
        { editedData }
      );
      toast(data.success ? "success" : "failed");
      if (data.success)
        queryClient.invalidateQueries({ queryKey: ["repoData"] });

      setEditable(false);
    } catch (error) {
      console.log(error);
      toast("code break error");
    } finally {
      setloading(null);
    }
  };

  const generatehandler = async () => {
    if (!selectedNotification) return;
    setloading("generate");
    const { success } = await fetcherWc("/generate_franchise", "POST", {
      selectedNotification,
    });
    setloading(null);
    toast(success ? "success" : "failed");
    if (success) queryClient.invalidateQueries({ queryKey: ["repoData"] });
  };
  const openhandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    notif: Notification
  ) => {
    e.stopPropagation();

    window.open(notif.certificateLink, "_blank");
  };

  if (isPending) {
    <Loader />;
    return;
  }

  if (error) return;

  const notifications = data.data;

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
            <div>
              {notif.certificateLink && (
                <Button onClick={(e) => openhandler(e, notif)}>
                  view Certificate
                </Button>
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  deletehandler.mutate({ id: notif.id });
                }}
                className="ml-2"
                variant={"destructive"}
              >
                Delete
                {deleteloading === notif.id && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
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
            <Button
              variant="outline"
              className="absolute top-2 left-2"
              onClick={() => setEditable((prev) => !prev)}
            >
              {editable ? "Cancel" : "Edit"}
            </Button>

            <div className="w-full overflow-y-auto">
              <div className="grid grid-cols-2 w-full gap-2">
                {[
                  { label: "Applicant Name", key: "name" },
                  { label: "Email ID", key: "email" },
                  { label: "Father Name", key: "father" },
                  { label: "C/O Name", key: "coName" },
                  { label: "Date of Birth", key: "dob" },
                  { label: "Mobile No", key: "mobileNo" },
                  { label: "Address", key: "AddressLine" },
                  { label: "Village", key: "vill" },
                  { label: "Post Office", key: "po" },
                  { label: "Police Station", key: "ps" },
                  { label: "Pin Code", key: "pin" },
                  { label: "State", key: "state" },
                  { label: "District", key: "dist" },
                  { label: "Nationality", key: "nationality" },
                  { label: "Gender", key: "sex" },
                  { label: "Category", key: "category" },
                  { label: "ID Proof", key: "idProof" },
                  { label: "ID Proof No", key: "idProofNo" },
                  { label: "Education Qualification", key: "eduqualification" },
                  { label: "Bathroom", key: "bathroom" },
                  { label: "Trade License No", key: "tradeLicense" },
                  { label: "Square Fit", key: "squareFit" },
                  { label: "House Room No", key: "houseRoomNo" },
                  {
                    label: "Franchise Subscription",
                    key: "Subscription",
                  },
                ].map((field, index) => (
                  <div key={index} className="p-2">
                    <label className="font-semibold">{field.label}: </label>
                    {editable ? (
                      typeof editedData?.[field.key as keyof Notification] ===
                      "boolean" ? (
                        <select
                          className="border rounded px-2 py-1"
                          value={
                            editedData?.[field.key as keyof Notification]
                              ? "Yes"
                              : "No"
                          }
                          onChange={(e) =>
                            setEditedData((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    [field.key]:
                                      e.target.value.toLowerCase() === "yes"
                                        ? true
                                        : false,
                                  }
                                : prev
                            )
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={
                            editedData?.[
                              field.key as keyof Notification
                            ]?.toString() || ""
                          }
                          onChange={(e) =>
                            setEditedData((prev) =>
                              prev
                                ? { ...prev, [field.key]: e.target.value }
                                : prev
                            )
                          }
                        />
                      )
                    ) : (
                      <span>
                        {field.key === "dob" || field.key === "Subscription"
                          ? new Date(selectedNotification?.dob ?? "")
                              .toISOString()
                              .split("T")[0]
                          : selectedNotification?.[
                              field.key as keyof Notification
                            ]?.toString()}
                      </span>
                    )}
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
              {editable && (
                <div className="flex justify-center mb-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={savehandler}
                    disabled={loading === "update"}
                  >
                    Save Changes{" "}
                    {loading === "update" && (
                      <Loader2 className="animate-spin" />
                    )}
                  </Button>
                </div>
              )}
            </div>
            {!selectedNotification.verified && (
              <Button
                className="mt-5 bg-purple-700 hover:bg-purple-800"
                onClick={verifyhandler}
                disabled={loading === "verify"}
              >
                Verify
                {loading === "verify" && <Loader2 className="animate-spin" />}
              </Button>
            )}

            {selectedNotification.verified &&
              !selectedNotification.certificateLink && (
                <Button
                  className="mt-5 bg-purple-700 hover:bg-purple-800"
                  onClick={generatehandler}
                  disabled={loading === "generate"}
                >
                  Generate Certificate
                  {loading === "generate" && (
                    <Loader2 className="animate-spin" />
                  )}
                </Button>
              )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
