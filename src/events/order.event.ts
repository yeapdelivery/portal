export function postNewOrderEvent() {
  document.dispatchEvent(new CustomEvent("newOrder"));
}

export function useNewOrderEvent(callback: () => void) {
  document.addEventListener("newOrder", callback);
}

export function removeNewOrderEvent(callback: () => void) {
  document.removeEventListener("newOrder", callback);
}
