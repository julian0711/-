import React, { useState, useEffect } from 'react';
import { Card as CardType, GameState } from '../types';
import Card from './Card';
import PlayerStats from './PlayerStats';
import { applyCardEffect, checkGameOver, checkReachedTown, prepareNextTurn } from '../utils/gameUtils';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, setGameState }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [actionMessage, setActionMessage] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Debug logging
  useEffect(() => {
    console.log('Current hand:', gameState.hand);
    console.log('Hand length:', gameState.hand.length);
    console.log('Player location:', gameState.player.location);
  }, [gameState.hand, gameState.player.location]);

  // Play the selected card immediately upon selection
  const handleCardSelect = (card: CardType, index: number) => {
    // Don't allow selection during animation
    if (isAnimating) return;
    
    // Set the selected card and index
    setSelectedCard(card);
    setSelectedCardIndex(index);
    setIsAnimating(true);
    
    // Set a message based on card (even if face down)
    setActionMessage(index === 0 
      ? `${card.name}を使用します。${card.description}` 
      : `カード ${index + 1} を使用します。`);
    
    // Give time for animation to complete before updating game state
    setTimeout(() => {
      playSelectedCard(card);
    }, 1500); // Animation duration
  };

  // Play the selected card
  const playSelectedCard = (card: CardType) => {
    // Apply card effect to player
    const updatedPlayer = applyCardEffect(gameState.player, card);
    
    // Check if reached town
    const reachedTown = checkReachedTown(updatedPlayer.progress, gameState.totalDistance);
    
    // Check if game over
    const gameOver = checkGameOver(updatedPlayer);
    
    // Create updated game state - discard ALL cards
    let updatedGameState: GameState = {
      ...gameState,
      player: {
        ...updatedPlayer,
        location: reachedTown ? 'town' : 'road'
      },
      discardPile: [...gameState.discardPile, ...gameState.hand], // Discard ALL cards in hand
      hand: [], // Empty the hand completely
      gameOver: gameOver
    };

    // Set action message
    let message = '';
    if (gameOver) {
      message = '旅商人の命は尽きました...';
    } else if (reachedTown) {
      message = '街に到着しました！商品の売買ができます。';
      updatedGameState.currentTown += 1;
    } else {
      message = `${card.name}を使用しました。${card.description}`;
    }
    setActionMessage(message);
    
    // Always prepare for next turn if not game over and not reached town
    if (!gameOver && !reachedTown) {
      updatedGameState = prepareNextTurn(updatedGameState);
    }
    
    // Update game state and reset selection state
    setGameState(updatedGameState);
    setSelectedCard(null);
    setSelectedCardIndex(null);
    setIsAnimating(false);
  };

  const handleContinueJourney = () => {
    // First update basic state
    const baseGameState = {
      ...gameState,
      player: {
        ...gameState.player,
        progress: 0,
        location: 'road'  // Important: set location to road
      },
      message: '街を出発し、次の冒険が始まります！',
      totalDistance: Math.floor(20 + gameState.currentTown * 5) // Increase distance for each town
    };
    
    // Then prepare the next turn to ensure we have cards
    const updatedGameState = prepareNextTurn(baseGameState);
    setGameState(updatedGameState);
    setSelectedCard(null);
    setSelectedCardIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Game message */}
      {(actionMessage || gameState.message) && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <p className="text-lg">{actionMessage || gameState.message}</p>
        </div>
      )}

      {/* Player stats */}
      <PlayerStats player={gameState.player} totalDistance={gameState.totalDistance} />

      {/* Main game area */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {gameState.player.location === 'town' 
            ? `第${gameState.currentTown}の街に到着` 
            : '道中'}
        </h2>
        
        {gameState.gameOver ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">ゲームオーバー</h2>
            <p className="mb-4">旅商人の命は尽きました。到達した街の数: {gameState.currentTown}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              新しく始める
            </button>
          </div>
        ) : gameState.player.location === 'town' ? (
          <div className="text-center py-4">
            <p className="mb-4">街に到着しました！休息して準備を整えましょう。</p>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleContinueJourney}
            >
              旅を続ける
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <h3 className="font-semibold mb-2">
                カードを選択してください（左のカードのみ内容が見えます）:
              </h3>
              <p className="text-sm text-gray-600">
                右の2枚は内容が分からないままクリックすることでカードを使用します
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {gameState.hand && gameState.hand.length > 0 ? (
                gameState.hand.map((card, index) => {
                  // Only the first card (index 0) is face up
                  const isVisible = index === 0;
                  
                  return (
                    <Card 
                      key={card.id} 
                      card={card}
                      index={index}
                      onClick={() => handleCardSelect(card, index)}
                      selected={selectedCardIndex === index}
                      faceUp={isVisible}
                      isAnimating={isAnimating}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">カードがありません。新しいカードを引いてください。</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Game info */}
      <div className="mt-6 text-gray-600 text-sm">
        <p>山札残り: {gameState.deck.length}枚</p>
        <p>捨て札: {gameState.discardPile.length}枚</p>
        <p>手札: {gameState.hand.length}枚</p>
      </div>
    </div>
  );
};

export default GameBoard;
