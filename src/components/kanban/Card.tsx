import { CardType } from "@/lib/types/kanban.type";
import React from "react";
import DeleteCardButton from "./DeleteCardButton";
import { useBoardStore } from "@/stores/board.store";
import toast from "react-hot-toast";
import EditCardButton from "./EditCardButton";
import { motion } from "framer-motion";

type CardTypeProps = {
  dataCard: CardType;
  sourceListId: number;
  targetIndex: number;
  listType:"To Do" | "In Progress" | "Done"
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    cardId: string,
    sourceListId: number,
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => void;
};

const Card = ({
  dataCard,
  onDragStart,
  sourceListId,
  listType,
  onDragOver,
  targetIndex,
}: CardTypeProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newText, setNewText] = React.useState(dataCard.text);
  const editCard = useBoardStore((state) => state.editCard);

  function handleIsEditCard(
    e: React.FormEvent<HTMLDivElement | HTMLButtonElement>,
  ) {
    e.stopPropagation();
    setIsEditing(true);
  }

  function handleEditCard(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!newText.trim()) {
        setIsEditing(false);
        setNewText(dataCard.text);
        return;
      }
      editCard(sourceListId, dataCard.id, newText);
      toast.success("Changed Text!");
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setNewText(dataCard.text);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.4,
        ease: "backOut",
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileTap={{ scale: 0.97 }}
      whileDrag={{ scale: 0.97 }}
      className={`bg-white rounded-sm flex items-center justify-between  border border-border p-4 text-sm font-sans hover:cursor-text group h-16 border-l-4 ${(listType === "To Do" && "border-orange-200") || (listType === "In Progress" && "border-indigo-200") || (listType === "Done" && "border-green-200")}`}
      onDragOver={(e) => onDragOver(e, targetIndex)}
      draggable={isEditing ? false : true}
      onDragStart={(e) => onDragStart(e, dataCard.id, sourceListId)}
      onDoubleClick={handleIsEditCard}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewText(e.target.value)
          }
          onBlur={() => {
            setIsEditing(false);
          }}
          onKeyDown={handleEditCard}
          autoFocus
          className="border border-border outline-0 p-2"
        />
      ) : (
        <>
        <span>{newText}</span>
        </>
      )}

      <div
        className={`flex items-center gap-2 ${isEditing ? "opacity-0" : "opacity-100"}`}
      >

        <EditCardButton onClick={handleIsEditCard} />
        <DeleteCardButton listId={sourceListId} cardId={dataCard.id} />
      </div>
    </motion.div>
  );
};

export default Card;
