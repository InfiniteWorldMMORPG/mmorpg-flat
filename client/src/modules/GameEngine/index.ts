
let eventSource: EventTarget | null;

export const createEventSource = () => {
  if (eventSource === null) eventSource = new EventTarget();

  return eventSource;
};
