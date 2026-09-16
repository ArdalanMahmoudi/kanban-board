import { CardList } from "@/lib/types/kanban.type";
import React from "react";
import Card from "./Card";
import { useBoardStore } from "@/stores/board.store";
import { AddCardButton } from "./AddCardButton";
import { CirclePlusIcon, FilePlusCornerIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

const List = ({ list }: { list: CardList }) => {
  const moveCard = useBoardStore((state) => state.moveCard);
  const [hoverIndex, setHoverIndex] = React.useState<number | undefined>(
    undefined,
  );

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
    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = Number(e.dataTransfer.getData("sourceListId"));
    moveCard(cardId, sourceListId, list.id, hoverIndex);
    setHoverIndex(undefined);
  };

  const handleDragOverCard = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverIndex(targetIndex);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Title */}
      <div className="w-full flex flex-col bg-white border border-border rounded-sm">
        <div
          className={`w-full h-5 rounded-t-sm ${(list.title === "To Do" && "bg-orange-200") || (list.title === "In Progress" && "bg-indigo-200") || (list.title === "Done" && "bg-green-200")}`}
        ></div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-heading">{list.title}</h3>
            <p className="flex items-center justify-center  size-6 border border-border text-sm font-sans font-semibold">
              {list.cards.length}
            </p>
          </div>
          {/* Add-Task */}
          <AddCardButton
            listId={list.id}
            DialogTriggerButton={
              <Button variant={"default"}>
                <CirclePlusIcon className=" cursor-pointer size-5" />
              </Button>
            }
          />
        </div>
      </div>
      {/* Main-card */}
      <div
        className=" min-h-20 h-full  border border-border p-2 space-y-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {list.cards.length === 0 ? (
          <div className="w-full text-sm text-gray-500 p-4 flex justify-center items-center h-full flex-col gap-4">
            <FilePlusCornerIcon className="size-8" />
            <div className="flex flex-col items-center">
              <h3 className="text-accent-foreground font-semibold">
                No cards yet
              </h3>
              <p className="text-sm">Add a card to get started.</p>
            </div>
            <AddCardButton
              listId={list.id}
              DialogTriggerButton={
                <Button variant={"outline"} className={"text-sm"}>
                  <Plus /> Add card
                </Button>
              }
            />
          </div>
        ) : (
          list.cards.map((card, index) => (
            <Card
              key={card.id}
              dataCard={card}
              onDragStart={handleDragStart}
              sourceListId={list.id}
              listType={list.title}
              targetIndex={index}
              onDragOver={handleDragOverCard}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default List;
