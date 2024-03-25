export default function useDebounce(fn: (...args: any) => void, delay: number) {
  let timeout: NodeJS.Timeout;

  function debouncedFn(...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
