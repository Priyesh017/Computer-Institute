"use client";
import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

interface Course {
  id: number;
  CName: string;
  Duration: number;
  price: number;
}

export default function CourseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const queryClient = useQueryClient();

  const openEditModal = (course: Course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery<Course[]>({
    queryKey: ["Courses"],
    queryFn: () => fetcherWc("/fetchAllCourse", "GET"),
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const updateHandler = useMutation({
    mutationFn: () =>
      fetcherWc("/updateCourse", "PUT", currentCourse as Course),
    onSuccess: () => {
      toast.success("successfully updated");
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["Courses"] });
    },
  });

  if (isLoading) {
    <Loader />;
  }
  if (!courses) return;
  if (isError) return <h1>error happened...</h1>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCourse) return;
    const { name, value } = e.target;
    setCurrentCourse((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
        Course Management
      </h2>

      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex justify-between items-center border border-gray-200 bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-200"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                {course.CName}
              </h3>
              <p className="text-gray-500 mt-1 text-sm">
                {`${course.Duration} months`} &middot; {course.price}
              </p>
            </div>
            <button
              onClick={() => openEditModal(course)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Pencil className="h-6 w-6 text-blue-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && currentCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg animate-scale-up shadow-xl relative">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Edit Course
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="CName"
                value={currentCourse.CName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Course Name"
              />
              <input
                type="number"
                name="Duration"
                value={currentCourse.Duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Duration"
              />
              <input
                type="number"
                name="price"
                value={currentCourse.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Price"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold transition"
              >
                Cancel
              </Button>
              <Button
                onClick={() => updateHandler.mutate()}
                className="px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
              >
                Save{" "}
                {updateHandler.isPending && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
