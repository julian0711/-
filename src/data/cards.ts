import { Card } from '../types';

// 基本のカードデータ（重複あり）
export const initialDeck: Card[] = [
  // 移動カード (Movement) - 20枚
  { id: 'move-1', name: '小さな一歩', description: '1歩進む', type: 'movement', effect: { progress: 1 } },
  { id: 'move-2', name: '普通の歩み', description: '2歩進む', type: 'movement', effect: { progress: 2 } },
  { id: 'move-2', name: '普通の歩み', description: '2歩進む', type: 'movement', effect: { progress: 2 } },
  { id: 'move-3', name: '大きな前進', description: '3歩進む', type: 'movement', effect: { progress: 3 } },
  { id: 'move-4', name: '疾走', description: '4歩進む', type: 'movement', effect: { progress: 4 } },
  { id: 'move-5', name: '慎重な歩み', description: '1歩進み、体力を1回復する', type: 'movement', effect: { progress: 1, health: 1 } },
  { id: 'move-5', name: '慎重な歩み', description: '1歩進み、体力を1回復する', type: 'movement', effect: { progress: 1, health: 1 } },
  { id: 'move-6', name: '抜け道発見', description: '2歩進み、次の危険カードの効果を無効化する', type: 'movement', effect: { progress: 2, special: 'avoid_next_danger' } },
  { id: 'move-7', name: '商人の直感', description: '3歩進み、2ゴールドを獲得する', type: 'movement', effect: { progress: 3, gold: 2 } },
  { id: 'move-7', name: '商人の直感', description: '3歩進み、2ゴールドを獲得する', type: 'movement', effect: { progress: 3, gold: 2 } },
  { id: 'move-8', name: '夜間行軍', description: '5歩進むが、体力を1失う', type: 'movement', effect: { progress: 5, health: -1 } },
  { id: 'move-9', name: '馬車の乗車', description: '6歩進むが、3ゴールドを支払う', type: 'movement', effect: { progress: 6, gold: -3 } },
  { id: 'move-10', name: '旅商人の知恵', description: '移動距離は少ないが、2ゴールドを得る', type: 'movement', effect: { progress: 1, gold: 2 } },
  { id: 'move-10', name: '旅商人の知恵', description: '移動距離は少ないが、2ゴールドを得る', type: 'movement', effect: { progress: 1, gold: 2 } },
  
  // アイテムカード (Item) - 3枚
  { id: 'item-1', name: '薬草', description: '体力を2回復する', type: 'item', effect: { health: 2 } },
  { id: 'item-2', name: '薬草の束', description: '体力を4回復する', type: 'item', effect: { health: 4 } },
  
  // イベントカード (Event) - 3枚
  { id: 'event-1', name: '宝箱発見', description: '5ゴールドを獲得', type: 'event', effect: { gold: 5 } },
  { id: 'event-2', name: '旅人との出会い', description: '3ゴールドを獲得し、1歩進む', type: 'event', effect: { gold: 3, progress: 1 } },
  
  // 危険カード (Danger) - 4枚
  { id: 'danger-1', name: '野盗の襲撃', description: '体力を2失う', type: 'danger', effect: { health: -2 } },
  { id: 'danger-2', name: '足場の悪い道', description: '転んで体力を1失い、進行度が1減る', type: 'danger', effect: { health: -1, progress: -1 } },
  { id: 'danger-3', name: '強盗', description: '3ゴールドを奪われる', type: 'danger', effect: { gold: -3 } }
];

// 町で購入できるアイテム
export const shopItems: Card[] = [
  {
    id: 'shop-1',
    name: '上質な薬',
    description: '体力を6回復する',
    type: 'item',
    effect: { health: 6 }
  },
  {
    id: 'shop-2',
    name: '馬',
    description: 'カードを引くたびに進行度+1の効果を得る',
    type: 'item',
    effect: { special: 'horse' }
  },
  {
    id: 'shop-3',
    name: '護身用短剣',
    description: 'danger系カードの効果を半減させる',
    type: 'item',
    effect: { special: 'dagger' }
  },
];
