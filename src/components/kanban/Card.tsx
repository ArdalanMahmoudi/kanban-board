import { CardType } from "@/lib/types/kanban.type";
import React from "react";

type CardTypeProps = {
 dataCard:CardType,
 sourceListId:number,
 onDragStart:(e:React.DragEvent<HTMLDivElement>,cardId:string, sourceListId:number) => void   
}

const Card = ({dataCard,onDragStart, sourceListId}:CardTypeProps) => {
  return <div className="bg-white rounded-sm border border-border p-4 text-sm font-sans" draggable onDragStart={(e) => onDragStart(e,dataCard.id,sourceListId)}>{dataCard.text}</div>;
};

export default Card;
