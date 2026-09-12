import { findByField, insertCardAt } from "@/lib/helper";
import { KanbanBoardState } from "@/lib/types/kanban.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBoardStore = create<KanbanBoardState>()(
  persist(
    (set, get) => ({
      cardLists: [
        {
          id: 1,
          title: "To Do",
          cards: [],
        },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Done", cards: [] },
      ],
      moveCard: (
        cardId: string,
        sourceListId: number,
        targetListId: number,
        targetIndex?: number,
      ) => {
        const selectedCardList = findByField(
          get().cardLists,
          "id",
          sourceListId,
        );
        // get().cardLists.find(
        //   (list) => list.id === sourceListId,
        // );

        if (!selectedCardList) return;
        const selectedCard = findByField(selectedCardList.cards, "id", cardId);
        // selectedCardList.cards.find(
        //   (card) => card.id === cardId,
        // );

        if (!selectedCard) return;

        set((state) => {
          const updatedCardLists = state.cardLists.map((list) => {
            if (list.id === sourceListId && list.id === targetListId) {
              return {
                ...list,
                cards: insertCardAt(
                  list.cards.filter((card) => card.id !== cardId),
                  selectedCard,
                  targetIndex,
                ),
              };
            }
            if (list.id === sourceListId) {
              return {
                ...list,
                cards: list.cards.filter((card) => card.id !== cardId),
              };
            }
            if (list.id === targetListId) {
              return {
                ...list,
                cards: insertCardAt(list.cards, selectedCard, targetIndex),
              };
            }

            return list;
          });
          return {
            cardLists: updatedCardLists,
          };
        });
      },
      addCard: (listId: number, text: string) => {
        set((state) => {
          const updateCardInList = state.cardLists.map((list) => {
            if (list.id === listId) {
              const newCard = { id: crypto.randomUUID(), text };
              return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
          });
          return {
            ...state,
            cardLists: updateCardInList,
          };
        });
      },
      deleteCard: (listId: number, cardId: string) => {
        set((state) => {
          const updateCardInList = state.cardLists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.filter((card) => card.id !== cardId),
              };
            }
            return list;
          });
          return {
            ...state,
            cardLists: updateCardInList,
          };
        });
      },
      editCard: (listId: number, cardId: string, text: string) => {
        if (!text.trim()) {
          return
        }
        set((state) => {
          const updateCardInList = state.cardLists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.map((card) => {
                  if (card.id === cardId) {
                    return { ...card, text };
                  }
                  return card;
                }),
              };
            }
            return list;
          });
          return {
            ...state,
            cardLists: updateCardInList,
          };
        });
      },
    }),
    { name: "cardList" },
  ),
);
