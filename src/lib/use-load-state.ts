import { useCallback, useEffect, useState } from 'react';

export type LoadStatus = 'error' | 'loading' | 'ready';

export function useLoadState<Value>(load: () => Promise<Value>) {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [value, setValue] = useState<Value | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => {
    setStatus('loading');
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    let active = true;

    load()
      .then((result) => {
        if (active) {
          setValue(result);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (active) {
          setStatus('error');
        }
      });

    return () => {
      active = false;
    };
  }, [attempt, load]);

  return { reload, status, value };
}
