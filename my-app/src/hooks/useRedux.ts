// src/components/hooks/useRedux.ts
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

type ActionCreator<A extends unknown[] = unknown[], R extends Action = Action> = (...args: A) => R;

export function useRedux<Actions extends Record<string, ActionCreator>>(
  actions: Actions
): {
  [K in keyof Actions]: (...args: Parameters<Actions[K]>) => ReturnType<Actions[K]>
} {
  const dispatch = useDispatch();

  return Object.entries(actions).reduce((acc, [key, action]) => {
    const boundAction = (...args: Parameters<typeof action>) => {
      const actionResult = action(...args);
      return dispatch(actionResult);
    };
    
    return {
      ...acc,
      [key]: boundAction
    };
  }, {} as {
    [K in keyof Actions]: (...args: Parameters<Actions[K]>) => ReturnType<Actions[K]>
  });
}