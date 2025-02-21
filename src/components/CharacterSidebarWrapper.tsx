"use client";
import { Suspense, Component, ReactNode, ErrorInfo } from "react";
import dynamic from "next/dynamic";
import type { FC } from "react";
import type { CharacterSidebarProps } from "./CharacterSidebar";

const CharacterSidebar = dynamic<CharacterSidebarProps>(() => import("./CharacterSidebar").then((mod) => mod.default), {
  ssr: false,
  loading: () => <SidebarSkeleton />,
});

const SidebarSkeleton: FC = () => (
  <div className="container flex-col items-center w-fit md:w-[500px] border border-r-0 border-t-0 border-white justify-start h-fit rounded-bl-xl hidden lg:flex animate-pulse">
    {/* Header Skeleton */}
    <div className="flex flex-row w-full">
      <div className="py-4 border-b border-b-white text-center w-full">
        <div className="h-8 w-48 bg-gray-800 rounded mx-auto mb-2" />
        <div className="h-4 w-32 bg-gray-800 rounded mx-auto" />
      </div>
    </div>

    {/* Outfit Selection Skeleton */}
    <div className="flex flex-row w-full">
      <div className="py-1 text-sm border-b border-b-white text-center w-full justify-around flex flex-row px-4">
        <div className="h-6 w-20 bg-gray-800 rounded" />
        <div className="h-6 w-20 bg-gray-800 rounded" />
      </div>
    </div>

    {/* Image Placeholder */}
    <div className="w-full aspect-square bg-gray-800" />

    {/* Stats Skeleton */}
    <div className="border-white border border-r-0 border-l-0 border-b-0 w-full">
      <div className="border-b border-white w-full flex flex-row text-center text-sm">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-1/6 bg-gray-800 h-8 border-r border-white" />
        ))}
      </div>

      {/* Other sections skeleton */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border-b border-white p-4">
          <div className="h-6 w-32 bg-gray-800 rounded mb-4" />
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-6 w-24 bg-gray-800 rounded" />
            ))}
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
    console.error("CharacterSidebar error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container flex-col items-center w-fit md:w-[500px] border border-r-0 border-t-0 border-white justify-start h-fit rounded-bl-xl hidden lg:flex">
          <div className="p-4 text-center">
            <h2 className="text-xl text-red-500 mb-2">Failed to load character information</h2>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const CharacterSidebarWrapper: FC<CharacterSidebarProps> = (props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SidebarSkeleton />}>
        <CharacterSidebar {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

CharacterSidebarWrapper.displayName = "CharacterSidebarWrapper";

export default CharacterSidebarWrapper;
