export type MessageType<T extends string = string> = {
  text: string;
  buttonText: string;
  next: T | null;
};

export type MessagesRecordsType<T extends readonly [string, ...string[]]> =
  Record<T[number], MessageType<T[number]>>;
