import { CardType } from "@/lib/types/kanban.type";
import React from "react";
import DeleteCardButton from "./DeleteCardButton";

type CardTypeProps = {
  dataCard: CardType;
  sourceListId: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    cardId: string,
    sourceListId: number,
  ) => void;
};

const Card = ({
  dataCard,
  onDragStart,
  sourceListId,
}: CardTypeProps) => {


  return (
    <div
      className="bg-white rounded-sm flex items-center justify-between border border-border p-4 text-sm font-sans cursor-grab"
      draggable
      onDragStart={(e) => onDragStart(e, dataCard.id, sourceListId)}
    >
      <span>{dataCard.text}</span>
      <DeleteCardButton listId={sourceListId} cardId={dataCard.id}/>
    </div>
  );
};

export default Card;
