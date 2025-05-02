// app/logged-out/page.tsx
export default function LoggedOutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-red-500 mb-4">
          You are logged out
        </h1>
        <p className="text-gray-600 mb-6">Please login again to continue.</p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
