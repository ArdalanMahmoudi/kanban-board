import { CardType } from "./types/kanban.type";

export function insertCardAt (cards:CardType[], card:CardType, targetIndex:number) {
    if (targetIndex === undefined) { // undefined === 0,[]
        return [...cards, card]
    }
    const cardListStart = cards.slice(0,targetIndex)
    const cardListEnd = cards.slice(targetIndex)
    return [...cardListStart, card, ...cardListEnd]
}

export function findByField<T, K extends keyof T>(items: T[], field:K, value:T[K]) {
  return items.find(item => item[field] === value)
}