import { KanbanBoardState } from "@/lib/types/kanban.type";
import { create } from "zustand";

export const useBoardStore = create<KanbanBoardState>((set, get) => ({
  cardLists: [
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: "a", text: "task 1" },
        { id: "b", text: "task 2" },
      ],
    },
    { id: 2, title: "In Progress", cards: [{ id: "c", text: "task 3" },] },
    { id: 3, title: "Done", cards: [] },
  ],
  moveCard: (cardId: string, sourceListId: number, targetListId: number) => {
    console.log(cardId, sourceListId, targetListId);
    
    const selectedCardList = get().cardLists.find(
      (list) => list.id === sourceListId,
    );
  
    if (!selectedCardList) return;
    const selectedCard = selectedCardList.cards.find(
      (card) => card.id === cardId,
    );

    if (!selectedCard) return;

    set((state) => {
      const updatedCardLists = state.cardLists.map((list) => {
        if (sourceListId !== targetListId) {
          if (list.id === sourceListId) {
            return {
              ...list,
              cards : list.cards.filter(card => card.id !== cardId),
            };
          }
          if (list.id === targetListId) {
            return {
              ...list,
              cards: [...list.cards, selectedCard],
            };
          }
        }
        return list
      });
      return {
        ...state,
        cardLists: updatedCardLists,
      };
    });

  },
}));
