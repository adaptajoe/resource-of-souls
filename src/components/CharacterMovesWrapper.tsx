"use client";
import { Suspense, Component, ReactNode, ErrorInfo } from "react";
import dynamic from "next/dynamic";
import { Moves } from "@/types/characterDataTypes";

const CharacterMoves = dynamic<CharacterMovesWrapperProps>(() => import("./CharacterMoves").then((mod) => mod.default), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

interface CharacterMovesWrapperProps {
  moves: Moves[];
  characterId: string;
}

const LoadingPlaceholder = () => (
  <div className="border border-white rounded-xl w-full mb-4 pb-4 mt-6 animate-pulse">
    <div className="flex gap-2 ml-4 mb-4">
      <div className="h-10 w-20 bg-gray-800 rounded-t-lg" />
      <div className="h-10 w-20 bg-gray-800 rounded-t-lg" />
    </div>

    <div className="space-y-4 p-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border-t border-white/20 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
              <div className="h-4 w-48 bg-gray-800 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-800 rounded" />
              <div className="h-6 w-16 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CharacterMoves error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border border-red-500 rounded-xl w-full mb-4 p-4">
          <p className="text-red-500 font-medium">Failed to load character moves. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const CharacterMovesWrapper = (props: CharacterMovesWrapperProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPlaceholder />}>
        <CharacterMoves {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

CharacterMovesWrapper.displayName = "CharacterMovesWrapper";

export default CharacterMovesWrapper;
