import { Suspense } from "react";
import TermsContent from "@/components/TermsContent";

export default function Terms() {
  return (
    <Suspense
      fallback={
        <div className="p-16 space-y-4 text-white">
          <p>Loading terms...</p>
        </div>
      }
    >
      <TermsContent />
    </Suspense>
  );
}
