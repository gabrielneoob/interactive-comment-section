import CommentSection from "./components/comment-section/comment-section.component";
import Contaier from "./components/container/container.component";
import UserComment from "./components/user-comment/user-comment.component";
import { useUser } from "./hooks/useUser";

const App = () => {
  const { comments, currentUser } = useUser();

  return (
    <div>
      <Contaier>
        {comments.map((comment) => (
          <CommentSection commentData={comment} key={comment.id} />
        ))}
        <UserComment currentUser={currentUser} type="principal" />
      </Contaier>
    </div>
  );
};

export default App;
