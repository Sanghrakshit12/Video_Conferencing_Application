// pages/index.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Our Website!</h1>
        <p className="text-lg mb-8">This is the homepage content. Feel free to explore!</p>
        <Link href="?modal=true">
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Open Modal
          </button>
        </Link>
      </div>
    </div>
  );
}
