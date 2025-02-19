// src/app/_not-found/page.tsx
import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-teal-500 hover:underline">
        Go back to the Home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
