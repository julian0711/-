import React, { useState } from 'react';
import { MapPin, Scroll } from 'lucide-react';
import { GameState } from './types';
import { initializeGame } from './utils/gameUtils';
import GameBoard from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(initializeGame());

  const startGame = () => {
    setGameState(initializeGame());
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!gameStarted ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-xl rounded-lg max-w-2xl w-full p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin size={48} className="text-red-500" />
              <Scroll size={48} className="text-amber-500 ml-2" />
            </div>
            <h1 className="text-3xl font-bold mb-4">旅商人のカードゲーム</h1>
            <p className="mb-6 text-gray-600">
              あなたは旅商人となり、カードを使いながら次の街を目指します。
              道中の危険を乗り越え、品物を売買して利益を上げましょう。
              3枚のカードから1枚を選び、その効果で進んでいきます。
            </p>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">ゲームルール</h2>
              <ul className="text-left text-gray-700 list-disc pl-6">
                <li>毎ターン3枚のカードから1枚を選択して使用します</li>
                <li>進行度が目標に達すると街に到着します</li>
                <li>体力が0になるとゲームオーバーです</li>
                <li>街では体力回復やアイテムの取引ができます</li>
              </ul>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
              onClick={startGame}
            >
              旅を始める
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">旅商人のカードゲーム</h1>
          <GameBoard gameState={gameState} setGameState={setGameState} />
        </div>
      )}
    </div>
  );
}

export default App;
