
import { CardList } from "@/lib/types/kanban.type";
import React from "react";
import Card from "./Card";
import { useBoardStore } from "@/stores/board.store";
import { AddCardButton } from "./AddCardButton";
import { CirclePlusIcon, FilePlusCornerIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { statusColors } from "@/lib/status-colors";
import { Badge } from "../ui/badge";
import { AnimatePresence, motion } from "framer-motion";

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

  const colors = statusColors[list.status];

  return (
    <div className="h-full flex flex-col gap-4 border border-border rounded-sm bg-card text-card-foreground">
      {/* Title */}
      <div className={`w-full flex flex-col rounded-t-sm ${colors.header}`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-heading">
              {list.status}
            </h3>

            {/* Badge */}
            <Badge className={colors.badge}>
              {list.cards.length}
            </Badge>
          </div>

          {/* Add-Task */}
          <AddCardButton
            listId={list.id}
            DialogTriggerButton={
              <Button
                variant="ghost"
                className={colors.header}
              >
                <CirclePlusIcon className="cursor-pointer size-5" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Main-card */}
      <div
        className="relative min-h-20 h-full p-2 space-y-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Card */}
        <AnimatePresence>
          {list.cards.map((card, index) => (
            <Card
              key={card.id}
              dataCard={card}
              onDragStart={handleDragStart}
              sourceListId={list.id}
              listType={list.status}
              targetIndex={index}
              onDragOver={handleDragOverCard}
            />
          ))}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {list.cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: "backOut",
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="absolute inset-0 w-full flex justify-center items-center flex-col gap-4 p-4 text-sm text-muted-foreground"
            >
              <FilePlusCornerIcon className="size-8" />

              <div className="flex flex-col items-center">
                <h3 className="text-accent-foreground font-semibold">
                  No cards yet
                </h3>

                <p className="text-sm">
                  Add a card to get started.
                </p>
              </div>

              <AddCardButton
                listId={list.id}
                DialogTriggerButton={
                  <Button
                    variant="outline"
                    className="text-sm"
                  >
                    <Plus />
                    Add card
                  </Button>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default List;
