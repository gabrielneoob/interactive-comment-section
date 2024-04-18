import { ReactNode, createContext, useState } from "react";

type ReplyContextProps = {
  replyId: number;
  setReplyId: React.Dispatch<React.SetStateAction<number>>;
};

export const ReplyIdContext = createContext<ReplyContextProps>({
  replyId: 0,
  setReplyId: () => {},
});

export const ReplyIdProvider = ({ children }: { children: ReactNode }) => {
  const [replyId, setReplyId] = useState<number>(0);

  return (
    <ReplyIdContext.Provider value={{ replyId, setReplyId }}>
      {children}
    </ReplyIdContext.Provider>
  );
};
