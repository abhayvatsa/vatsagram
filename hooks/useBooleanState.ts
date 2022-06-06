import { useCallback, useState } from 'react';

export default function useBooleanState(
  initialState = false
): [boolean, (state?: boolean) => void, (state?: boolean) => void, () => void] {
  const [state, setState] = useState(initialState);

  const set = useCallback(
    (state = !initialState) => {
      setState(state);
    },
    [state]
  );

  const clear = useCallback(
    (state = initialState) => {
      setState(state);
    },
    [state]
  );

  const toggle = useCallback(() => {
    setState(!state);
  }, [state]);

  return [state, (s) => set(s), () => clear(), () => toggle()];
}
