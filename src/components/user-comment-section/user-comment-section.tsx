import { useReplyId } from "../../hooks/useReplyId";
import { useUser } from "../../hooks/useUser";
import { ReplyProp } from "../../types/comment-types";
import CommentCard from "../comment-card/comment-card.component";
import UserComment from "../user-comment/user-comment.component";

const UserCommentSection = ({ replyData }: { replyData: ReplyProp }) => {
  const { replyId } = useReplyId();
  const { currentUser } = useUser();

  return (
    <>
      <div>
        <CommentCard isReply commentData={replyData} />
      </div>
      <div className="mb-4">
        {replyId === replyData.id && <UserComment currentUser={currentUser} />}
      </div>
    </>
  );
};

export default UserCommentSection;
