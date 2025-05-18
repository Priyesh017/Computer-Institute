import CourseGrid from "@/components/Course_Grid";

function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Courses</h1>
        <CourseGrid />
      </div>
    </main>
  );
}
export default Home;
