import { Suspense } from "react";
import GlossaryContent from "@/components/GlossaryContent";

export default function Glossary() {
  return (
    <Suspense
      fallback={
        <div className="p-4 lg:p-16 space-y-4 text-white">
          <p>Loading Glossary...</p>
        </div>
      }
    >
      <GlossaryContent />
    </Suspense>
  );
}
