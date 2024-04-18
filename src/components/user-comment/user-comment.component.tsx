import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useReplyId } from "../../hooks/useReplyId";

const UserComment = ({
  currentUser,
  type,
}: {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  type?: "principal" | "principal-comment" | "reply";
}) => {
  const { setComments, comments } = useUser();
  const { replyId, setReplyId } = useReplyId();

  const [textValue, setTextValue] = useState("");

  return (
    <div className="bg-white rounded-lg">
      <div className="flex p-6 gap-x-4">
        <div className="size-15">
          <img
            src={currentUser.image.webp}
            alt={`${currentUser.username} avatar`}
          />
        </div>
        <textarea
          className="border rounded-lg w-full resize-none py-2 px-5 outline-none"
          name="user-comment"
          id=""
          rows={3}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button
          className="bg-moderate-blue h-max py-2 px-6 font-b text-white rounded-lg transition-all ease-out hover:opacity-50"
          onClick={() => {
            if (type === "principal" && textValue) {
              setComments((previous) => {
                return [
                  ...previous,
                  {
                    content: textValue,
                    createdAt: "now",
                    id: Math.floor(Math.random() * (8000 - 6 + 1) + 6),
                    score: 0,
                    user: {
                      image: {
                        png: currentUser.image.png,
                        webp: currentUser.image.webp,
                      },
                      username: currentUser.username,
                    },
                    replies: [],
                  },
                ];
              });
            } else if (type === "principal-comment" && textValue) {
              comments
                .find((item) => item.id === replyId)
                ?.replies?.push({
                  content: textValue,
                  createdAt: "now",
                  id: Math.floor(Math.random() * (8000 - 6 + 1) + 6),
                  score: 0,
                  user: {
                    image: {
                      png: currentUser.image.png,
                      webp: currentUser.image.webp,
                    },
                    username: currentUser.username,
                  },
                  replyingTo: comments.find((item) => item.id === replyId)?.user
                    .username as string,
                });
              setComments([...comments]);
            }
            setTextValue("");
            setReplyId(0);
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default UserComment;
