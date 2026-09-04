export interface CardType {
  id: string;
  text: string;
}

export interface CardList {
  id: number;
  title: "To Do" | "In Progress" |"Done";
  cards: CardType[];
}
export interface KanbanBoardState {
    cardLists: CardList[];
    moveCard: (cardId: string, sourceListId: number, targetListId: number) => void;
}

