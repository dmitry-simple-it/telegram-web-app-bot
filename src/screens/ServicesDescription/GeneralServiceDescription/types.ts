export type MessageType = {
  text: string;
  buttonText?: string;
};

export type MessageRecordsType = [MessageType, ...MessageType[]];
