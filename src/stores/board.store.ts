import { KanbanBoardState } from "@/lib/types/kanban.type";
import { create } from "zustand";


export const useBoardStore = create<KanbanBoardState>((set, get) => ({
  cardLists: [
    {
      id: 1,
      title: "to do",
      cards: [
        { id: "a", text: "task 1" },
        { id: "b", text: "task 2" },
      ],
    },
    { id: 2, title: "done", cards: [] },
  ],
  moveCard: (cardId: string, sourceListId: number, targetListId: number) => {
    const selectedCardList = get().cardLists.find(
      (list) => list.id === sourceListId,
    );
    if (!selectedCardList) return;
    const selecteCard = selectedCardList.cards.find(
      (card) => card.id === cardId,
    );
    if (!selecteCard) return;
    set((state) => {
        const updatedCardLists = state.cardLists.map((list) => {
            if(list.id === sourceListId){
                return {
                    ...list,
                    cards:[...list.cards.filter((card) => card.id !==  cardId)]
                }
            }
            if(list.id === targetListId){
                return{
                    ...list,
                    cards:[...list.cards, selecteCard]
                }
            }
        })
        return {
          ...state,
          cardLists:updatedCardLists
        }
    })

  },
}));
