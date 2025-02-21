import { useState, useEffect } from "react";

interface UseOptimizedVideoProps {
  inView: boolean;
}

export const useOptimizedVideo = ({ inView }: UseOptimizedVideoProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [inView, shouldLoad]);

  return shouldLoad;
};
