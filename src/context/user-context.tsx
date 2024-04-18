import { ReactNode, createContext, useState } from "react";
import { CommentReplyProp } from "../types/comment-types";
import dataJson from "../assets/data.json";

type CurentUserProps = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type UserContextProps = {
  currentUser: CurentUserProps;
  comments: CommentReplyProp[];
  setComments: React.Dispatch<React.SetStateAction<CommentReplyProp[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurentUserProps>>;
};

export const UserContext = createContext<UserContextProps>({
  currentUser: dataJson.currentUser,
  comments: dataJson.comments,
  setComments: () => {},
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurentUserProps>(
    dataJson.currentUser
  );
  const [comments, setComments] = useState<CommentReplyProp[]>(
    dataJson.comments
  );

  return (
    <UserContext.Provider
      value={{
        comments,
        currentUser,
        setComments,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
