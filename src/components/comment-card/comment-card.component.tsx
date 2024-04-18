/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import replyIcon from "../../assets/icons/icon-reply.svg";
import trashIcon from "../../assets/icons/icon-delete.svg";
import editIcon from "../../assets/icons/icon-edit.svg";
import { CommentReplyProp } from "../../types/comment-types";
import clsx from "clsx";
import { useUser } from "../../hooks/useUser";
import { useReplyId } from "../../hooks/useReplyId";
import { useState } from "react";
import ConfirmDelteModal from "../confirm-delete-modal/confirm-delete-modal.component";

const CommentCard = ({
  commentData,
  isReply,
}: {
  commentData: CommentReplyProp;
  isReply: boolean;
}) => {
  const { currentUser, comments, setComments } = useUser();
  const { setReplyId } = useReplyId();
  const [toggleEditComment, setToggleEditComment] = useState(false);
  const [textEditComment, setTextEditComment] = useState(commentData.content);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className={clsx("", {
        "max-w-xl": isReply,
        "mb-4": !isReply,
        "my-2": isReply,
        flex: isReply,
      })}
    >
      <div className={clsx("flex bg-white rounded-md p-4 w-full")}>
        <div className="bg-very-light-gray flex flex-col justify-center items-center text-gray-300 font-bold p-2 rounded-md mr-6 self-center h-max">
          <button
            className="text-lg pb-1 transition-all ease-out hover:text-moderate-blue"
            onClick={() => {
              if (isReply) {
                for (let i = 0; i < comments.length; i++) {
                  for (let j = 0; j < comments[i].replies.length; j++) {
                    if (comments[i].replies[j].id === commentData.id) {
                      console.log(comments[i].replies[j].score);

                      comments[i].replies[j].score += 1;
                    }
                  }
                }
              } else {
                for (let i = 0; i < comments.length; i++) {
                  if (comments[i].id === commentData.id) {
                    comments[i].score += 1;
                  }
                }
              }
              setComments([...comments]);
            }}
          >
            +
          </button>
          <p className="text-lg text-moderate-blue">{commentData.score}</p>
          <button
            className="text-lg pt-1 transition-all ease-out hover:text-moderate-blue"
            onClick={() => {
              if (commentData.score > 0) {
                if (isReply) {
                  for (let i = 0; i < comments.length; i++) {
                    for (let j = 0; j < comments[i].replies.length; j++) {
                      if (comments[i].replies[j].id === commentData.id) {
                        console.log(comments[i].replies[j].score);

                        comments[i].replies[j].score -= 1;
                      }
                    }
                  }
                } else {
                  for (let i = 0; i < comments.length; i++) {
                    if (comments[i].id === commentData.id) {
                      comments[i].score -= 1;
                    }
                  }
                }
              }
              setComments([...comments]);
            }}
          >
            -
          </button>
        </div>
        <div className="w-full">
          <div className="flex justify-between mb-4 w-full">
            <div className="flex items-center gap-x-4">
              <div className="max-w-10">
                <img src={commentData.user.image.webp} alt="" />
              </div>
              <p className="font-bold text-grayish-blue">
                {commentData.user.username}
              </p>
              {currentUser.username === commentData.user.username && (
                <div className="bg-moderate-blue text-white text-xs p-1 rounded-md">
                  you
                </div>
              )}
              <p className="text-grayish-blue">{commentData.createdAt}</p>
            </div>
            <div className="flex items-center gap-x-4 text-moderate-blue font-bold ">
              {currentUser.username === commentData.user.username && (
                <div
                  className="flex items-center gap-x-2 cursor-pointer transition-all ease-in-out hover:opacity-50"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <div>
                    <img src={trashIcon} alt="" />
                  </div>
                  <p className="text-soft-red">Delete</p>
                </div>
              )}
              {openModal && (
                <ConfirmDelteModal
                  id={commentData.id}
                  setOpenModal={setOpenModal}
                />
              )}
              {currentUser.username === commentData.user.username ? (
                <div
                  className="flex items-center gap-x-2 cursor-pointer transition-all ease-in-out hover:opacity-50"
                  onClick={() => setToggleEditComment((previous) => !previous)}
                >
                  <div>
                    <img src={editIcon} alt="reply icon" />
                  </div>
                  <p>Edit</p>
                </div>
              ) : (
                <div
                  className="flex items-center gap-x-2 cursor-pointer transition-all ease-in-out hover:opacity-50"
                  onClick={() => {
                    setReplyId(commentData.id);
                  }}
                >
                  <div>
                    <img src={replyIcon} alt="reply icon" />
                  </div>
                  <p>Reply</p>
                </div>
              )}
            </div>
          </div>
          {!toggleEditComment ? (
            <p className="text-gray-600 pb-3">{commentData.content}</p>
          ) : (
            <div className="flex flex-col">
              <textarea
                name="edit-comment"
                id="edit-comment"
                className="w-full outline-none resize-none border rounded-lg py-2 px-4"
                rows={4}
                value={textEditComment}
                onChange={(e) => setTextEditComment(e.target.value)}
              ></textarea>
              <button
                className="w-max self-end bg-moderate-blue text-white py-2 px-5 rounded-lg mt-3 transition-all ease-in-out hover:opacity-50"
                onClick={() => {
                  if (textEditComment) {
                    if (!isReply) {
                      for (let i = 0; i < comments.length; i++) {
                        comments[i].content = textEditComment;
                      }
                    } else {
                      for (let i = 0; i < comments.length; i++) {
                        for (let j = 0; j < comments[i].replies.length; j++) {
                          if (comments[i].replies[j].id === commentData.id) {
                            comments[i].replies[j].content = textEditComment;
                          }
                        }
                      }
                    }
                  }

                  setComments([...comments]);
                  setToggleEditComment(false);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
