import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUITS = ['♠','♥','♦','♣'];
const VALUES = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];
const isRed = (s) => s==='♥' || s==='♦';

function newDeck(){ const d=[]; for(const s of SUITS) for(const v of VALUES) d.push({s,v,id:`${v}${s}-${Math.random().toString(36).slice(2,7)}`}); return d; }
function shuffle(a){ const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]];} return b; }

function scoreHand(cards){
  if(!cards.length) return {name:'No cards', base:0, type:'none'};
  const vCount={}, sCount={};
  const order = Object.fromEntries(VALUES.map((v,i)=>[v,i]));
  for(const c of cards){ vCount[c.v]=(vCount[c.v]||0)+1; sCount[c.s]=(sCount[c.s]||0)+1; }
  const counts = Object.values(vCount).sort((a,b)=>b-a);
  const isFlush = cards.length===5 && Object.values(sCount).some(n=>n===5);
  let isStraight=false;
  if(cards.length===5){
    const idxs = cards.map(c=>order[c.v]).sort((a,b)=>a-b);
    if(new Set(idxs).size===5){
      isStraight = idxs[4]-idxs[0]===4;
      const wheel = new Set([order['A'],order['5'],order['4'],order['3'],order['2']]);
      const uniq = [...new Set(cards.map(c=>c.v))];
      if(uniq.length===5 && uniq.every(v=>wheel.has(order[v]))) isStraight = true;
    }
  }
  if(isStraight && isFlush) return {name:'Straight Flush', base:120, type:'sf'};
  if(counts[0]===4) return {name:'Four of a Kind', base:100, type:'four'};
  if(counts[0]===3 && counts[1]===2) return {name:'Full House', base:80, type:'full'};
  if(isFlush) return {name:'Flush', base:60, type:'flush'};
  if(isStraight) return {name:'Straight', base:50, type:'straight'};
  if(counts[0]===3) return {name:'Three of a Kind', base:40, type:'three'};
  if(counts[0]===2 && counts[1]===2) return {name:'Two Pair', base:25, type:'two'};
  if(counts[0]===2) return {name:'Pair', base:10, type:'pair'};
  return {name:'High Card', base:5, type:'high'};
}

const rarityStyles = { common:{border:'border-emerald-500',text:'text-emerald-300'}, rare:{border:'border-sky-500',text:'text-sky-300'}, legendary:{border:'border-yellow-400',text:'text-yellow-300'} };
const TEST_JOKERS = [
  { id:'j1', name:'Lucky Green', rarity:'common', desc:'+10 flat score per play', eff:{ flatBonus:10 } },
  { id:'j2', name:'Blue Pairmaster', rarity:'rare', desc:'+20% to Pair / Two Pair', eff:{ pairBoost:1.2 } },
  { id:'j3', name:'Golden Flush', rarity:'legendary', desc:'+20% to Flush / S. Flush', eff:{ flushBoost:1.2 } },
];
function applyEffects(base, type, eff){ let total=base; if(eff?.pairBoost&&(type==='pair'||type==='two')) total=Math.round(total*eff.pairBoost); if(eff?.flushBoost&&(type==='flush'||type==='sf')) total=Math.round(total*eff.flushBoost); if(eff?.flatBonus) total+=eff.flatBonus; return total; }

export default function App(){
  const [hand,setHand] = useState(()=>shuffle(newDeck()).slice(0,5));
  const [deck,setDeck] = useState(()=>shuffle(newDeck()));
  const [selected,setSelected] = useState(new Set());
  const [roundScore,setRoundScore] = useState(0);
  const [playsLeft,setPlaysLeft] = useState(3);
  const [discardsLeft,setDiscardsLeft] = useState(2);
  const [activeJoker,setActiveJoker] = useState(TEST_JOKERS[0]);
  const [lastResult,setLastResult] = useState(null);
  const selectedCards = useMemo(()=>hand.filter(c=>selected.has(c.id)),[hand,selected]);

  const toggleSel = (id)=>{ const s=new Set(selected); s.has(id)?s.delete(id):s.add(id); setSelected(s); };
  const drawCards = (n)=>{ let d=[...deck]; let out=[]; while(n>0){ if(d.length===0) d=shuffle(newDeck()); out.push(d.pop()); n--; } setDeck(d); return out; };
  const discardSelected = ()=>{ if(discardsLeft<=0||selected.size===0) return; const keep=hand.filter(c=>!selected.has(c.id)); const need=5-keep.length; const drawn=drawCards(need); setHand([...keep,...drawn]); setSelected(new Set()); setDiscardsLeft(x=>x-1); setLastResult({name:'Discarded', total:0, info:`+${need} new card(s)`}); };
  const playHand = ()=>{ if(playsLeft<=0) return; const cards = selectedCards.length?selectedCards:hand; const s = scoreHand(cards); const pts = applyEffects(s.base, s.type, activeJoker?.eff||{}); setRoundScore(x=>x+pts); setPlaysLeft(p=>p-1); setSelected(new Set()); setLastResult({name:s.name, total:pts, info:`${cards.length} card(s) played • ${activeJoker.name}`}); };
  const newHand = ()=>{ const d=shuffle(newDeck()); setDeck(d); setHand(d.slice(0,5)); setSelected(new Set()); };

  return (<div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
      <div className="font-bold tracking-wide">BALTARUM <span className="text-emerald-400">Demo</span></div>
      <div className="text-sm">Score: <b className="text-emerald-400">{roundScore}</b> • Plays: <b>{playsLeft}</b> • Discards: <b>{discardsLeft}</b></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex justify-center gap-3 mb-6">
          {hand.map((c,idx)=>{ const sel=selected.has(c.id); return (
            <motion.button key={c.id} initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay: idx*0.08 }}
              onClick={()=>toggleSel(c.id)} className={"w-20 h-28 rounded-xl border relative grid place-items-center text-xl "+(sel?"border-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.5)]":"border-white/15 bg-white/5")} style={{ transform:`translateY(${sel?-6:0}px)` }}>
              <div className={"absolute top-1 left-2 text-sm "+(isRed(c.s)?"text-rose-400":"text-zinc-200")}>{c.v}</div>
              <div className={"text-2xl "+(isRed(c.s)?"text-rose-300":"text-zinc-100")}>{c.s}</div>
              {sel && <div className="absolute -top-2 right-2 text-emerald-400 text-xs bg-emerald-400/10 rounded px-1 border border-emerald-400/50">SEL</div>}
            </motion.button> );})}
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={playHand} disabled={playsLeft<=0} className={"px-4 py-2 rounded text-black font-semibold "+(playsLeft>0?"bg-emerald-600 hover:bg-emerald-500":"bg-zinc-600 cursor-not-allowed")}>Play Hand</button>
          <button onClick={discardSelected} disabled={discardsLeft<=0||selected.size===0} className={"px-4 py-2 rounded border "+(discardsLeft>0&&selected.size>0?"bg-white/10 hover:bg-white/20 border-white/15":"bg-zinc-700 border-zinc-700 cursor-not-allowed")}>Discard Selected</button>
          <button onClick={newHand} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/15">New Hand</button>
        </div>
        <AnimatePresence>{lastResult && (
          <motion.div key={lastResult.name+lastResult.total} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="mx-auto max-w-md text-center rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold">{lastResult.name}</div>
            <div className="text-sm text-zinc-400">{lastResult.info}</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">+{lastResult.total}</div>
          </motion.div>
        )}</AnimatePresence>
      </div>
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-semibold mb-3">Jokers</div>
          <div className="grid gap-3">{TEST_JOKERS.map(j=>{ const active = activeJoker?.id===j.id; const rs = rarityStyles[j.rarity]; return (
            <button key={j.id} onClick={()=>setActiveJoker(j)} className={`relative w-full rounded-2xl p-3 text-left border ${rs.border} bg-black/30 transition transform hover:-translate-y-0.5 ${active ? 'ring-2 ring-offset-2 ring-offset-black '+rs.border : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-24 h-36 rounded-xl grid place-items-center border-2 ${rs.border} bg-zinc-900`}>
                  <div className={`text-2xl ${rs.text}`}>🃏</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{j.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${rs.border} ${rs.text}`}>{j.rarity}</span>
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">{j.desc}</div>
                  {active && <div className="text-xs text-emerald-300 mt-2">Active</div>}
                </div>
              </div>
            </button> );})}</div>
          <div className="text-xs text-zinc-400 mt-3">Choose one — effect applies to scoring.</div>
        </div>
      </div>
    </div>
  </div>);}
