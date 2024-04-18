import { useContext } from "react";
import { ReplyIdContext } from "../context/reply-context";

export const useReplyId = () => {
  const context = useContext(ReplyIdContext);
  if (!context) {
    throw new Error("Context need to be inside a provider");
  }

  return context;
};
