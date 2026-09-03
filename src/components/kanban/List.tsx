
import { CardType } from '@/lib/types/kanban.type';
import React from 'react';
import Card from './Card';


const List = ({ title, cards }: { title: string; cards: CardType[] }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                {cards.map((card) => (
                    <Card key={card.id} text={card.text} />
                ))}
            </div>
        </div>
    );
}

export default List;
