"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { fetcher } from "@/helper";
import { toast } from "react-toastify";

// Set correct PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CertificateGenerator() {
  const [EnrollmentNo, setEnrollmentNo] = useState("");
  const [certificateVisible, setCertificateVisible] = useState(false);

  const [link, setlink] = useState<string | null>(null);

  const handler = async () => {
    const filteredVal = parseInt(EnrollmentNo.split("/")[1]);
    const data = await fetcher("/Certi_fetch", "POST", {
      filteredVal,
    });
    if (!data) {
      toast("certificate not found");
      return;
    }
    setlink(data.certificateLink);
    setCertificateVisible(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-violet-400">Certificate Viewer</h1>

      <input
        type="text"
        placeholder="Enter Enrollment No"
        value={EnrollmentNo}
        onChange={(e) => setEnrollmentNo(e.target.value)}
        className="p-2 mt-4 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 text-center"
      />
      <Button
        onClick={handler}
        className="mt-4 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg"
      >
        View Certificate
      </Button>

      {certificateVisible && link && (
        <div className="mt-6 text-violet-400 text-center">
          <h2 className="text-xl font-bold">Certificate of Completion</h2>
          <p className="mt-2">This is to certify that</p>
          <p className="text-lg font-semibold">Student ID: {EnrollmentNo}</p>
          <p className="mt-2">has successfully completed the course.</p>

          <div className="mt-4">
            <Document file={link}>
              <Page pageNumber={1} scale={0.6} />
            </Document>
          </div>

          {/* <Button
            onClick={() => window.open(link, "_blank")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download Certificate
          </Button> */}
        </div>
      )}
    </div>
  );
}
