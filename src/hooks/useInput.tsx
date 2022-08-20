import { ChangeEvent, useState } from 'react';

export const useInput = (
  initialValue: string,
  validation?: (value: string) => boolean
) => {
  const [value, setValue] = useState<typeof initialValue>(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    let willUpdate = true;
    if (typeof validation === 'function') {
      willUpdate = validation(value);
    }
    if (willUpdate) setValue(value);
  };
  return { value, onChange };
};
