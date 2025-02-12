import Link from "next/link";

export default function Characters() {
  return (
    <div className="container p-8 min-w-fit">
      <nav className="flex flex-row">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p className="px-2">/</p>
        <Link href="/changelog" className="text-teal-400 hover:underline">
          Changelog
        </Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Changelog</h1>
      <div className="flex flex-col border-t border-gray-400">
        <strong className="text-lg pt-2">v1.0.1</strong>
        <p className="text-gray-400 text-sm italic ml-4">21/03/2025</p>
        <ul className="list-disc ml-8 my-2">
          <li>TBC.</li>
        </ul>
      </div>
      <div className="flex flex-col border-t border-gray-400">
        <strong className="text-lg pt-2">v1.0.0</strong>
        <p className="text-gray-400 text-sm italic ml-4">21/03/2025</p>
        <ul className="list-disc ml-8 my-2">
          <li>Bleach - Rebirth of Souls released on the Xbox Marketplace.</li>
          <li>Bleach - Rebirth of Souls released on the PlayStation Store.</li>
          <li>Bleach - Rebirth of Souls released on Steam.</li>
        </ul>
      </div>
    </div>
  );
}
