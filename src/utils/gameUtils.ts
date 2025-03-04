import { Card, GameState, Player } from '../types';
import { initialDeck } from '../data/cards';

// Initialize a new game
export const initializeGame = (): GameState => {
  const shuffledDeck = shuffleDeck([...initialDeck]);
  const hand = drawCards(shuffledDeck, 3);
  
  return {
    player: {
      health: 10,
      maxHealth: 10,
      gold: 10,
      progress: 0,
      inventory: [],
      location: 'road' // Start on the road, not in town
    },
    deck: shuffledDeck.slice(3), // Remove the 3 cards drawn
    hand,
    discardPile: [],
    currentTown: 0,
    totalDistance: 20, // Distance to next town
    message: "旅の始まりです。最初の街を出発しましょう。",
    gameOver: false
  };
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

// Draw cards from deck
export const drawCards = (deck: Card[], count: number): Card[] => {
  // Make sure we're returning exactly 'count' cards (or all remaining cards if deck is smaller)
  return deck.slice(0, Math.min(count, deck.length));
};

// Apply card effect to player
export const applyCardEffect = (player: Player, card: Card): Player => {
  const newPlayer = { ...player };
  
  if (card.effect.progress) {
    newPlayer.progress += card.effect.progress;
  }
  
  if (card.effect.health) {
    newPlayer.health = Math.min(
      newPlayer.maxHealth, 
      Math.max(0, newPlayer.health + card.effect.health)
    );
  }
  
  if (card.effect.gold) {
    newPlayer.gold = Math.max(0, newPlayer.gold + card.effect.gold);
  }
  
  if (card.effect.addItem) {
    newPlayer.inventory.push(card.effect.addItem);
  }
  
  if (card.effect.removeItem && newPlayer.inventory.includes(card.effect.removeItem)) {
    const index = newPlayer.inventory.indexOf(card.effect.removeItem);
    newPlayer.inventory.splice(index, 1);
  }
  
  return newPlayer;
};

// Check if player has reached the next town
export const checkReachedTown = (progress: number, totalDistance: number): boolean => {
  return progress >= totalDistance;
};

// Check if game is over (player died)
export const checkGameOver = (player: Player): boolean => {
  return player.health <= 0;
};

// Prepare for next turn by drawing cards
export const prepareNextTurn = (gameState: GameState): GameState => {
  let deck = [...gameState.deck];
  let discardPile = [...gameState.discardPile];
  
  // If deck is empty or has fewer than 3 cards, shuffle discard pile and make it the new deck
  if (deck.length < 3 && discardPile.length > 0) {
    deck = [...deck, ...shuffleDeck(discardPile)];
    discardPile = [];
  }
  
  // Always draw exactly 3 cards for the hand
  const hand = drawCards(deck, 3);
  
  return {
    ...gameState,
    deck: deck.slice(hand.length), // Remove the drawn cards from the deck
    hand,
    discardPile
  };
};
