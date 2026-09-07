import { CardType } from "./types/kanban.type";

export function insertCardAt (cards:CardType[], card:CardType, targetIndex:number) {
    if (targetIndex === undefined) {
        return [...cards, card]
    }
    const cardListStart = cards.slice(0,targetIndex)
    const cardListEnd = cards.slice(targetIndex)
    return [...cardListStart, card, ...cardListEnd]
}