export function onPersisted(fnc: () => void): void {
  window.addEventListener('pageshow', (event: PageTransitionEvent) => {
    if (event.persisted) {
      fnc();
    }
  });
}
