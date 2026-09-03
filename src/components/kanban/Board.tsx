"use client"
import { useBoardStore } from '@/stores/board.store';
import React from 'react';
import List from './List';

const Board = () => {
    const cardLists = useBoardStore((state) => state.cardLists)
    return (
        <div className='flex gap-8'>
          {cardLists.map((list) => (
            <List key={list.id} title={list.title} cards={list.cards} />
          ))}
        </div>
    );
}

export default Board;
