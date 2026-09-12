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
    moveCard: (cardId: string, sourceListId: number, targetListId: number, targetIndex?:number) => void;
    addCard:(listId:number, text:string) => void
    deleteCard:(listId:number, cardId:string) => void
    editCard:(listId:number, cardId:string, text:string) => void
}

