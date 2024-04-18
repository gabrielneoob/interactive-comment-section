import { useReplyId } from "../../hooks/useReplyId";
import { useUser } from "../../hooks/useUser";
import { CommentReplyProp } from "../../types/comment-types";
import CommentCard from "../comment-card/comment-card.component";
import UserCommentSection from "../user-comment-section/user-comment-section";
import UserComment from "../user-comment/user-comment.component";

const CommentSection = ({ commentData }: { commentData: CommentReplyProp }) => {
  const { replyId } = useReplyId();
  const { currentUser } = useUser();
  return (
    <section>
      <CommentCard commentData={commentData} isReply={false} />
      {replyId === commentData.id && (
        <div className="mb-4">
          <UserComment currentUser={currentUser} type="principal-comment" />
        </div>
      )}
      {commentData.replies && commentData.replies?.length > 0 && (
        <div className="flex justify-between">
          <div className="w-small h-auto my-5 ml-14 bg-gray-300"></div>
          <div>
            {commentData.replies.map((replie) => (
              <UserCommentSection replyData={replie} key={replie.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
