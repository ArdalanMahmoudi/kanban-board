"use client"
import { CardType } from "@/lib/types/kanban.type";
import React, { useRef, useState } from "react";
import DeleteCardButton from "./DeleteCardButton";
import { useBoardStore } from "@/stores/board.store";
import toast from "react-hot-toast";
import EditCardButton from "./EditCardButton";
import { motion } from "framer-motion";
import { statusColors } from "@/lib/status-colors";

type CardTypeProps = {
  dataCard: CardType;
  sourceListId: number;
  targetIndex: number;
  listType: "To Do" | "In Progress" | "Done";
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
  const editCard = useBoardStore((state) => state.editCard);
  const cardLists = useBoardStore((state) => state.cardLists);
  const [isEditing, setIsEditing] = React.useState(false);
  const [newText, setNewText] = React.useState(dataCard.text);
  const colors = statusColors[listType];
  const [isDragging, setIsDragging] = useState(false);
  const moveCard = useBoardStore((state) => state.moveCard);

  // Handle-Status-Input
  function handleIsEditCard(
    e: React.FormEvent<HTMLDivElement | HTMLButtonElement>,
  ) {
    e.stopPropagation();
    setIsEditing(true);
  }

  // ----Handle-Logic-EditCard------
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

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" ) {
    return
    }
      e.preventDefault();

      const currentListIndex = cardLists.findIndex(
        (list) => list.id === sourceListId,
      );
      const direction = e.key === "ArrowRight" ? 1 : -1
      const targetList = cardLists[currentListIndex + direction];

      if (!targetList) {
        return;
      }
      moveCard(dataCard.id, sourceListId, targetList?.id);

  }

  return (
    <motion.div
      layout
      tabIndex={0}
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        scale: isDragging ? 1.05 : 1,
        opacity: isDragging ? 0.6 : 1,
      }}
      exit={{ opacity: 0, y: 14, scale: 0.95 }}
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
      className={`bg-card text-card-foreground rounded-sm flex items-center justify-between border p-4 text-sm font-sans hover:cursor-grab group h-16 border-l-4 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${colors.border}`}
      onDragOver={(e) => onDragOver(e, targetIndex)}
      draggable={isEditing ? false : true}
      onDragStart={(e) => {
        onDragStart(e, dataCard.id, sourceListId);
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      onDoubleClick={handleIsEditCard}
      onKeyDown={handleCardKeyDown}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewText(e.target.value)
          }
          onBlur={() => {
            setNewText(dataCard.text);
            setIsEditing(false);
          }}
          onKeyDown={handleEditCard}
          autoFocus
          className="border border-border outline-0 p-2 bg-background text-foreground"
        />
      ) : (
        <span>{newText}</span>
      )}

      <div
        className={`flex items-center gap-2 ${
          isEditing ? "opacity-0" : "opacity-100"
        }`}
      >
        <EditCardButton onClick={handleIsEditCard} />
        <DeleteCardButton listId={sourceListId} cardId={dataCard.id} />
      </div>
    </motion.div>
  );
};

export default Card;
