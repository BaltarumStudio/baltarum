import { useEffect, useState } from 'react';
import Hand from './components/Hand';
import JokerPanel from './components/JokerPanel';
import { JOKERS } from './lib/jokers';
import { evaluateHand } from './lib/evaluateHand';
import ComboToast from './components/ComboToast'; // 👈 добавлено

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
  const [toast, setToast] = useState(null); // 👈 добавлено

  useEffect(() => {
    const d = shuffle(makeDeck());
    setDeck(d);
    setHand(drawN(d, 5));
  }, []);

  function shuffle(a){ return a.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }

  function toggle(i) {
    setSelected(sel => sel.includes(i) ? sel.filter(x=>x!==i) : [...sel, i]);
  }

  function playHand() {
    if (plays <= 0 || selected.length === 0) return;
    setPlays(p=>p-1);
    const picked = selected.map(i => hand[i]);
    const res = evaluateHand(picked);

    // применяем джокеров
    let ctx = { combo: res.combo, base: res.base, mult: res.mult, bonus: 0 };
    for (const j of jokers) if (j.effect) ctx = j.effect(ctx) || ctx;

    const gained = Math.round((ctx.base + ctx.bonus) * ctx.mult);
    setScore(s => s + gained);

    // 👇 показываем тост с названием комбы и очками
    setToast(`${ctx.combo}  +${gained}`);
    setTimeout(() => setToast(null), 1200);

    // заменить сыгранные карты новыми
    const restDeck = deck.slice(5);
    const newCards = restDeck.slice(0, selected.length);
    const newHand = [...hand];
    selected.forEach((idx, k) => newHand[idx] = newCards[k]);
    setDeck(restDeck.slice(selected.length));
    setHand(newHand);
    setSelected([]);
  }

  function discardSelected() {
    if (discards <= 0 || selected.length === 0) return;
    setDiscards(d=>d-1);
    const restDeck = deck.slice(5);
    const newCards = restDeck.slice(0, selected.length);
    const newHand = [...hand];
    selected.forEach((idx, k) => newHand[idx] = newCards[k]);
    setDeck(restDeck.slice(selected.length));
    setHand(newHand);
    setSelected([]);
  }

  function restart() {
    const d = shuffle(makeDeck());
    setDeck(d);
    setHand(drawN(d, 5));
    setSelected([]);
    setScore(0); setRound(1); setTarget(60); setPlays(2); setDiscards(2);
  }

  useEffect(() => {
    if (score >= target || (plays <= 0 && discards <= 0)) {
      // конец раунда
      if (score >= target) {
        setRound(r=>r+1);
        setTarget(t=>Math.round(t*1.25));
      }
      setPlays(2); setDiscards(2);
    }
  }, [score, plays, discards]); // простая логика для демо

  return (
    <div style={{ minHeight:'100vh', background:'#0b0f14', color:'#fff', display:'grid', gridTemplateColumns:'1fr 280px' }}>
      <div style={{ padding:20 }}>
        <div style={{ display:'flex', gap:16, marginBottom:16, alignItems:'center', flexWrap:'wrap' }}>
          <strong>Round: {round}</strong>
          <span>Score: {score} / {target}</span>
          <span>Plays: {plays}</span>
          <span>Discards: {discards}</span>
          <button onClick={playHand} style={btn}>Play Hand</button>
          <button onClick={discardSelected} style={btnGhost}>Discard Selected</button>
          <button onClick={restart} style={btnGhost}>Restart</button>
        </div>

        <Hand cards={hand} selected={selected} onToggle={toggle} />
        <div style={{ textAlign:'center', marginTop:8, opacity:.85 }}>
          {selected.length ? `${selected.length} selected` : 'Select cards to play/discard'}
        </div>
      </div>

      <JokerPanel jokers={jokers} />

      {/* 👇 тост поверх всего */}
      <ComboToast show={!!toast} text={toast} />
    </div>
  );
}

const btn = { padding:'10px 16px', borderRadius:10, border:'none', background:'#10b981', color:'#041014', fontWeight:800, cursor:'pointer' };
const btnGhost = { padding:'10px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,.2)', background:'transparent', color:'#fff', cursor:'pointer' };
