export const IDEAFORGE_DATA_EVENT = 'ideaforge:data-changed';

export function emitDataChanged(detail = {}) {
  window.dispatchEvent(new CustomEvent(IDEAFORGE_DATA_EVENT, { detail }));
}

export function listenForDataChanged(handler) {
  window.addEventListener(IDEAFORGE_DATA_EVENT, handler);
  return () => window.removeEventListener(IDEAFORGE_DATA_EVENT, handler);
}
