import { useState } from "react";

export function useCustomActionState(action: Function, initialState: any) {
  const [state, setState] = useState(initialState);

  const handleAction = async (formData: FormData) => {
    const result = await action(state, formData);
    if (result) {
      setState(result);
    }
  };

  return [state, handleAction] as const;
}
