import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  selected?: boolean;
  faceUp?: boolean;
  index?: number;
  isAnimating?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  selected, 
  faceUp = true, 
  index,
  isAnimating = false
}) => {
  // Different styles based on card type
  const getCardStyle = () => {
    switch (card.type) {
      case 'movement':
        return 'bg-blue-50 border-blue-500';
      case 'item':
        return 'bg-green-50 border-green-500';
      case 'event':
        return 'bg-purple-50 border-purple-500';
      case 'danger':
        return 'bg-red-50 border-red-500';
      default:
        return 'bg-gray-50 border-gray-500';
    }
  };

  // Different icon or symbol based on card type
  const getCardIcon = () => {
    switch (card.type) {
      case 'movement':
        return '👣';
      case 'item':
        return '🎒';
      case 'event':
        return '✨';
      case 'danger':
        return '⚠️';
      default:
        return '🃏';
    }
  };

  // Animation classes based on selected state and isAnimating flag
  const getAnimationClasses = () => {
    if (!isAnimating) return '';
    if (selected) {
      return 'animate-bounce z-10'; // Bounce animation for selected card
    } else {
      return 'opacity-0 transform scale-95 transition-all duration-500'; // Fade out for non-selected cards
    }
  };

  if (!faceUp) {
    return (
      <div 
        className={`rounded-lg p-3 border-2 border-gray-400 bg-gray-300 
                  ${selected ? 'ring-4 ring-yellow-400' : 'hover:shadow-md hover:scale-105'} 
                  cursor-pointer w-40 h-64 flex flex-col justify-center items-center m-2
                  transition-all duration-300 ${getAnimationClasses()}`}
        onClick={onClick}
      >
        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-3xl">?</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          カード {index !== undefined ? index + 1 : ""}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`rounded-lg p-3 border-2 ${getCardStyle()} 
                ${selected ? 'ring-4 ring-yellow-400' : 'hover:shadow-md hover:scale-105'} 
                cursor-pointer w-40 h-64 flex flex-col justify-between m-2
                transition-all duration-300 ${getAnimationClasses()}`}
      onClick={onClick}
    >
      <div className="text-base font-bold flex justify-between items-center">
        <span>{card.name}</span>
        <span className="text-xl">{getCardIcon()}</span>
      </div>
      
      <div className="mt-2 flex-grow">
        <p className="text-sm text-gray-700">{card.description}</p>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        {card.effect.progress && (
          <div>進行: {card.effect.progress > 0 ? `+${card.effect.progress}` : card.effect.progress}</div>
        )}
        {card.effect.health && (
          <div>体力: {card.effect.health > 0 ? `+${card.effect.health}` : card.effect.health}</div>
        )}
        {card.effect.gold && (
          <div>ゴールド: {card.effect.gold > 0 ? `+${card.effect.gold}` : card.effect.gold}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
