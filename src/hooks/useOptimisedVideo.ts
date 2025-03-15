import { useState, useEffect } from "react";

interface IUseOptimizedVideoProps {
  inView: boolean;
}

export const useOptimizedVideo = ({ inView }: IUseOptimizedVideoProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [inView, shouldLoad]);

  return shouldLoad;
};
