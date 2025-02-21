"use client";
import dynamic from "next/dynamic";
import { FC, Suspense, Component, ReactNode } from "react";
import { CharacterAnimationsProps } from "./CharacterAnimations";

const CharacterAnimations = dynamic(() => import("./CharacterAnimations").then((mod) => mod.default), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

// Separate loading component for reusability and better organization
const LoadingPlaceholder: FC = () => (
  <div className="border border-white rounded-xl w-full mb-4 pb-4 mt-6 animate-pulse">
    <div className="h-10 w-32 bg-teal-400/20 rounded ml-4 mt-4" />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="aspect-video bg-teal-400/10 rounded-lg" />
      ))}
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border border-red-500 rounded-xl w-full mb-4 pb-4 mt-6 p-4">
          <p className="text-red-500">Failed to load animations. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const CharacterAnimationsWrapper: FC<CharacterAnimationsProps> = (props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPlaceholder />}>
        <CharacterAnimations {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CharacterAnimationsWrapper;
