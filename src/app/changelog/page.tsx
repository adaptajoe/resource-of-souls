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
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Rebirth of Souls</h2>

          <div className="flex flex-col border-t border-gray-400">
            <strong className="text-lg pt-2">v1.0.1</strong>
            <p className="text-gray-400 text-sm italic ml-4">??/??/????</p>
            <ul className="list-disc ml-8 my-2 text-xs">
              <li>TBC.</li>
            </ul>
          </div>
          <div className="flex flex-col border-t border-gray-400">
            <strong className="text-lg pt-2">v1.0.0</strong>
            <p className="text-gray-400 text-sm italic ml-4">21/03/2025</p>
            <ul className="list-disc ml-8 my-2 text-xs">
              <li>BLEACH - Rebirth of Souls released on the Xbox Marketplace.</li>
              <li>BLEACH - Rebirth of Souls released on the PlayStation Store.</li>
              <li>BLEACH - Rebirth of Souls released on Steam.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-4 md:mt-0">Resource of Souls</h2>
          <div className="flex flex-col border-t border-gray-400">
            <strong className="text-lg pt-2">v1.0.1</strong>
            <p className="text-gray-400 text-sm italic ml-4">??/??/????</p>
            <ul className="list-disc ml-8 my-2 text-xs">
              <li>TBC.</li>
            </ul>
          </div>
          <div className="flex flex-col border-t border-gray-400">
            <strong className="text-lg pt-2">v1.0.0</strong>
            <p className="text-gray-400 text-sm italic ml-4">??/0?/2025</p>
            <ul className="list-disc ml-8 my-2 text-xs">
              <li>BLEACH - Resource of Souls released.</li>
              <li>Homepage was added.</li>
              <li>Character page was added.</li>
              <li>Character page searching was added.</li>
              <li>Character alphabetical order filtering was added.</li>
              <li>Character release order filtering was added.</li>
              <li>Character realm filtering was added.</li>
              <li>Character gender filtering was added.</li>
              <li>Character Detail pages were added.</li>
              <li>Character Detail page outfit system was added.</li>
              <li>Character Detail page Game Term tooltip system was added.</li>
              <li>Character Detail page Archetype tooltip system was added.</li>
              <li>Character Detail page Animation tooltip system was added.</li>
              <li>Character Detail page Animations were added.</li>
              <li>Character Detail page Moveset system was added.</li>
              <li>Terminology page was added.</li>
              <li>Terminology page searching was added.</li>
              <li>Archetypes were added.</li>
              <li>Game Terms were added.</li>
              <li>Offline page was added.</li>
              <li>Story Mode page was added.</li>
              <li>Side Story Mode page was added.</li>
              <li>Secret Story Mode page was added.</li>
              <li>Mission Mode page was added.</li>
              <li>Changelog page was added.</li>
              <li>Community page was added.</li>
              <li>Ranked Community Leaderboard page was added.</li>
              <li>Versus Image Generator page was added.</li>
              <li>Modding page was added.</li>
              <li>Creators page was added.</li>
              <li>A public GitHub Repository was established.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
