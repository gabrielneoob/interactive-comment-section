import React from "react";
import { useUser } from "../../hooks/useUser";

const ConfirmDelteModal = ({
  id,
  setOpenModal,
}: {
  id: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { comments, setComments } = useUser();

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <div className="bg-white max-w-80 p-6">
        <p className="font-bold text-grayish-blue text-lg mb-4">
          Delete comment
        </p>
        <p className="text-grayish-blue text-sm mb-6">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undeone
        </p>
        <div className="flex text-white text-xs justify-center">
          <button
            className="bg-grayish-blue py-2 px-6 rounded-lg mr-3"
            onClick={() => setOpenModal(false)}
          >
            NO, CANCEL
          </button>
          <button
            className="bg-soft-red py-2 px-6 rounded-lg"
            onClick={() => {
              setComments(comments.filter((comment) => comment.id !== id));
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelteModal;
