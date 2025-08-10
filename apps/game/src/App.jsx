import { useEffect, useState } from 'react';
import Hand from './components/Hand';
import JokerPanel from './components/JokerPanel';
import { JOKERS } from './lib/jokers';
import { evaluateHand } from './lib/evaluateHand';
import ComboToast from './components/ComboToast'; // добавлено для тоста

const SUITS = ['♠','♥','♦','♣'];
const RANKS = ['A','2','3','4','5','6','7','8','9','T','J','Q','K'];

function makeDeck() {
  const d = [];
  for (const s of SUITS) for (const r of RANKS) d.push({ rank:r, suit:s });
  return d;
}
function drawN(deck, n) { return deck.slice(0, n); }

export default function App() {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState(60);
  const [plays, setPlays] = useState(2);
  const [discards, setDiscards] = useState(2);
  const [jokers] = useState(JOKERS.slice(0,3));
  const [toast, setToast] = useState(null); // добавлено для тоста
  const [discardPile, setDiscardPile] = useState([]); // сброс карт

  // Инициализация колоды и руки
  useEffect(() => {
    const d = shuffle(makeDeck());
    setDeck(d);
    setHand(drawN(d, 5));
  }, []);

  function shuffle(a){ return a.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }

  function toggle(i) {
    setSelected(sel => sel.includes(i) ? sel.filter(x=>x!==i) : [...sel, i]);
  }

  // Функция для добора карт из колоды
  function drawFromDeck(need) {
    let d = [...deck];
    if (d.length < need) {
      const fresh = shuffle(makeDeck())
        .filter(c => !hand.some(h => h.rank === c.rank && h.suit === c.suit));
      d = [...d, ...fresh];
    }
    const newCards = d.slice(0, need);
    setDeck(d.slice(need));
    return newCards;
  }

  // Функция для завершения хода (игра карт)
 function playHand() {
  if (plays <= 0 || selected.length === 0) return;
  setPlays(p => p - 1); // уменьшаем оставшиеся ходы

  // Оценка комбинации выбранных карт
  const picked = selected.map(i => hand[i]);
  const res = evaluateHand(picked); // используем функцию для вычисления очков

  let ctx = { combo: res.combo, base: res.base, mult: res.mult, bonus: 0 };

  // Применяем джокеров
  for (const j of jokers) if (j.effect) ctx = j.effect(ctx) || ctx;

  // Рассчитываем очки
  const gained = Math.round((ctx.base + ctx.bonus) * ctx.mult);
  setScore(s => s + gained); // обновляем счет

  // Отправляем карты в сброс
  setDiscardPile(dp => [...dp, ...picked]);

  // Добираем столько карт, сколько выбрали
  const replacements = drawFromDeck(selected.length);

  // Обновляем руку (заменяем выбранные карты на новые)
  const newHand = [...hand];
  selected.forEach((idx, k) => newHand[idx] = replacements[k]);
  setHand(newHand);

  // Очищаем выбранные карты
  setSelected([]);

  // Показать тост с результатами
  setToast(`${ctx.combo} +${gained}`);
  setTimeout(() => setToast(null), 1200);
}


  // Функция для сброса карт
  function discardSelected() {
    if (discards <= 0 || selected.length === 0) return;
    setDiscards(d => d - 1);
    const tossed = selected.map(i => hand[i]);
    setDiscardPile(dp => [...dp, ...tossed]);

    const replacements = drawFromDeck(selected.length);

    const newHand = [...hand];
    selected.forEach((idx, k) => newHand[idx] = replacements[k]);
    setHand(newHand);
    setSelected([]);
  }

  // Функция для перезапуска игры
  function restart() {
    const d = shuffle(makeDeck());
    setDeck(d);
    setHand(drawN(d, 5));
    setDiscardPile([]);
    setSelected([]);
    setScore(0); setRound(1); setTarget(60); setPlays(2); setDiscards(2);
  }

  // Обработка зав
