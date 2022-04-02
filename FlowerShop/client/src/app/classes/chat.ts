export interface Message {
  sender: {
    id: number;
  };
  message: string;
  chatRoom: {
    id: number;
  };
}
