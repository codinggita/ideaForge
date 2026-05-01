import { useState } from 'react';

export default function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (nextValue) => {
    setValue(nextValue);
    try {
      sessionStorage.setItem(key, JSON.stringify(nextValue));
    } catch {
      // Storage can be unavailable in private browsing modes.
    }
  };

  return [value, updateValue];
}
