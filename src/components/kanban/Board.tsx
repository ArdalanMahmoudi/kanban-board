"use client"
import { useBoardStore } from '@/stores/board.store';
import React from 'react';
import List from './List';

const Board = () => {
    const cardLists = useBoardStore((state) => state.cardLists)
    return (
        <div className='grid grid-cols-3 gap-6 h-full max-h-84 w-full max-w-5xl'>
          {cardLists.map((list) => (
            <List key={list.id} list={list}/>
          ))}
        </div>
    );
}

export default Board;
