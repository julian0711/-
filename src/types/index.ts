export interface Card {
  id: string;
  name: string;
  description: string;
  type: 'movement' | 'item' | 'event' | 'danger';
  effect: CardEffect;
}

export interface CardEffect {
  // Movement effects
  progress?: number;
  // Resource effects
  health?: number;
  gold?: number;
  // Item effects
  addItem?: string;
  removeItem?: string;
  // Special effects
  special?: string;
}

export interface Player {
  health: number;
  maxHealth: number;
  gold: number;
  progress: number;
  inventory: string[];
  location: 'road' | 'town';
}

export interface GameState {
  player: Player;
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
  currentTown: number;
  totalDistance: number;
  message: string;
  gameOver: boolean;
}
