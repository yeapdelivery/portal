export function postEvent(event: string, data: any) {
  document.dispatchEvent(new CustomEvent(event, { detail: data }));
}

export function useEvent(event: string, callback: (data: any) => void) {
  document.addEventListener(event, (e) => {
    callback((e as CustomEvent).detail);
  });
}

export function removeEvent(event: string, callback: (data: any) => void) {
  document.removeEventListener(event, (e) => {
    callback((e as CustomEvent).detail);
  });
}
