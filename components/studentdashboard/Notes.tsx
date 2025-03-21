"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  subject: string;
  content: string;
  pdfUrl: string;
}

const StackableNotes: React.FC = () => {
  const [groupedNotes, setGroupedNotes] = useState<Record<string, Note[]>>({});

  const courseName = "Bachelor of Science - Semester 1";

  const demoNotes: Note[] = [
    {
      id: "1",
      subject: "Mathematics",
      content: "Integration techniques and formulas.",
      pdfUrl: "/pdfs/mathematics1.pdf",
    },
    {
      id: "2",
      subject: "Mathematics",
      content: "Linear algebra basics.",
      pdfUrl: "/pdfs/mathematics2.pdf",
    },
    {
      id: "3",
      subject: "Physics",
      content: "Newton's laws of motion.",
      pdfUrl: "/pdfs/physics1.pdf",
    },
    {
      id: "4",
      subject: "Physics",
      content: "Thermodynamics introduction.",
      pdfUrl: "/pdfs/physics2.pdf",
    },
    {
      id: "5",
      subject: "Chemistry",
      content: "Periodic table trends.",
      pdfUrl: "/pdfs/chemistry1.pdf",
    },
  ];

  useEffect(() => {
    // Group notes by subject
    const grouped = demoNotes.reduce((acc, note) => {
      if (!acc[note.subject]) {
        acc[note.subject] = [];
      }
      acc[note.subject].push(note);
      return acc;
    }, {} as Record<string, Note[]>);
    setGroupedNotes(grouped);
  }, []);

  useEffect(() => {
    anime({
      targets: ".note-card",
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 200 }),
      easing: "easeOutElastic(1, .8)",
    });
  }, [groupedNotes]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-violet-600 mb-8 text-center">
        {courseName}
      </h1>
      {Object.entries(groupedNotes).map(([subject, notes]) => (
        <div key={subject} className="mb-8">
          <h2 className="text-2xl font-bold text-violet-600 mb-6 border-b-2 border-violet-500 pb-2">
            {subject}
          </h2>
          <div className="flex flex-col space-y-4">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                className="note-card relative w-full bg-gray-800 text-white p-5 rounded-lg shadow-lg border border-violet-500 cursor-pointer hover:bg-violet-700 transition"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => window.open(note.pdfUrl, "_blank")}
              >
                <p className="text-lg font-medium">{note.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackableNotes;
