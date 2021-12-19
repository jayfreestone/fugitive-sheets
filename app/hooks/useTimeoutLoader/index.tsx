import { Transition } from '@remix-run/react/transition';
import { useEffect, useState } from 'react';

function useTimeoutLoader(state: Transition['state']) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (state === 'loading') {
      const timeout = setTimeout(() => setShowLoader(true), 300);

      return () => {
        setShowLoader(false);
        clearTimeout(timeout);
      };
    }
  }, [state]);

  return showLoader;
}

export default useTimeoutLoader;
