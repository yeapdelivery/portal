import { useState } from "react";

const useLoading = (
  initialValue = false
): [boolean, () => void, () => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(initialValue);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return [isLoading, startLoading, stopLoading];
};

export default useLoading;
