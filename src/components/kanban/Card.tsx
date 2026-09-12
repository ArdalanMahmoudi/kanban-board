import { CardType } from "@/lib/types/kanban.type";
import React from "react";
import DeleteCardButton from "./DeleteCardButton";
import { useBoardStore } from "@/stores/board.store";
import toast from "react-hot-toast";
import EditCardButton from "./EditCardButton";

type CardTypeProps = {
  dataCard: CardType;
  sourceListId: number;
  targetIndex: number;
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
  onDragOver,
  targetIndex,
}: CardTypeProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newText, setNewText] = React.useState(dataCard.text);
  const editCard = useBoardStore((state) => state.editCard);

  function handleIsEditCard(e: React.FormEvent<HTMLDivElement | HTMLButtonElement>) {
    e.stopPropagation();
    setIsEditing(true);
  }

  function handleEditCard(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!newText.trim()) {
        setIsEditing(false)
        setNewText(dataCard.text);
        return
      }
      editCard(sourceListId, dataCard.id, newText);
      toast.success("Changed Text!");
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setNewText(dataCard.text)
    }
  }
  return (
    <div
      className="bg-white rounded-sm flex items-center justify-between border border-border p-4 text-sm font-sans hover:cursor-text group h-16"
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
        <span>{newText}</span>
      )}

      <div
        className={`flex items-center gap-2 ${isEditing ? "opacity-0" : "opacity-100"}`}
      >
        <EditCardButton onClick={handleIsEditCard} />
        <DeleteCardButton listId={sourceListId} cardId={dataCard.id} />
      </div>
    </div>
  );
};

export default Card;
