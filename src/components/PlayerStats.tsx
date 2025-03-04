import React from 'react';
import { Player } from '../types';
import { Heart, Coins, Map } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
  totalDistance: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, totalDistance }) => {
  // Calculate progress percentage
  const progressPercent = Math.min(100, (player.progress / totalDistance) * 100);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">旅商人ステータス</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Health */}
        <div className="flex items-center">
          <Heart className="text-red-500 mr-2" />
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span>体力</span>
              <span>{player.health}/{player.maxHealth}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Gold */}
        <div className="flex items-center">
          <Coins className="text-yellow-500 mr-2" />
          <div>
            <span className="font-bold">{player.gold}</span> ゴールド
          </div>
        </div>
        
        {/* Progress */}
        <div className="col-span-2">
          <div className="flex items-center mb-1">
            <Map className="text-blue-500 mr-2" />
            <div className="flex justify-between w-full">
              <span>次の街までの距離</span>
              <span>{player.progress}/{totalDistance}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        
        {/* Location */}
        <div className="col-span-2">
          <div className="text-gray-600">
            現在地: {player.location === 'town' ? '街' : '道中'}
          </div>
        </div>
        
        {/* Inventory */}
        {player.inventory.length > 0 && (
          <div className="col-span-2 mt-2">
            <h3 className="font-semibold">所持品:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {player.inventory.map((item, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;
