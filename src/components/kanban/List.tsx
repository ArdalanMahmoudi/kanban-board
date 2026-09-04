import { CardList } from "@/lib/types/kanban.type";
import React from "react";
import Card from "./Card";
import { useBoardStore } from "@/stores/board.store";
import {CirclePlus} from "lucide-react"

const List = ({ list }: { list: CardList }) => {
  const moveCard = useBoardStore((state) => state.moveCard);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    cardId: string,
    sourceListId: number,
  ) => {
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("sourceListId", String(sourceListId));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("handle drop");

    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = Number(e.dataTransfer.getData("sourceListId"));
    moveCard(cardId, sourceListId, list.id);
  };
  return (
    <div className="h-full flex flex-col gap-4">
      {/* Title */}
      <div className="w-full flex flex-col bg-white border border-border rounded-sm">
        <div className={`w-full h-5 rounded-t-sm ${list.title === "To Do" && "bg-orange-200" || list.title === "In Progress" && "bg-indigo-200" || list.title === "Done" && "bg-green-200"}`}></div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-heading">{list.title}</h3>
            <p className="flex items-center justify-center  size-6 border border-border text-sm font-sans font-semibold">1</p>
          </div>
          <CirclePlus className="stroke-1"/>
        </div>
      </div>
      <div className="min-h-20" onDragOver={handleDragOver} onDrop={handleDrop}>
        {list.cards.map((card) => (
          <Card
            key={card.id}
            dataCard={card}
            onDragStart={handleDragStart}
            sourceListId={list.id}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
