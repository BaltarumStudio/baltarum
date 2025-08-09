export function evaluateHand(cards) {
  // cards: [{rank:'A', suit:'♠'|'♥'|'♦'|'♣'}]
  const rankOrder = 'A23456789TJQK';
  const ranks = cards.map(c => c.rank);
  const suits = cards.map(c => c.suit);

  const count = {};
  ranks.forEach(r => count[r] = (count[r]||0)+1);

  const isFlush = new Set(suits).size === 1;

  // straight (учтём A2345)
  const idxs = ranks.map(r => rankOrder.indexOf(r)).sort((a,b)=>a-b);
  let isStraight = idxs.every((v,i)=> i===0 || v === idxs[i-1]+1);
  // A2345
  if (!isStraight && ranks.includes('A')) {
    const low = ranks.map(r => (r==='A'? -1 : rankOrder.indexOf(r)))
                     .sort((a,b)=>a-b);
    isStraight = low.every((v,i)=> i===0 || v === low[i-1]+1);
  }

  const counts = Object.values(count).sort((a,b)=>b-a).join('');
  let combo = 'High Card';
  let base = 0;  // базовые очки
  let mult = 1;  // множитель

  if (isStraight && isFlush) { combo='Straight Flush'; base=30; mult=3; }
  else if (counts==='4,1' || counts==='41') { combo='Four of a Kind'; base=25; mult=2.5; }
  else if (counts==='3,2' || counts==='32') { combo='Full House'; base=22; mult=2.2; }
  else if (isFlush) { combo='Flush'; base=18; mult=1.8; }
  else if (isStraight) { combo='Straight'; base=16; mult=1.6; }
  else if (counts.startsWith('3')) { combo='Three of a Kind'; base=14; mult=1.4; }
  else if (counts==='2,2,1' || counts==='221') { combo='Two Pair'; base=12; mult=1.2; }
  else if (counts.startsWith('2')) { combo='Pair'; base=8; mult=1.1; }
  else { base=5; }

  return { combo, base, mult };
}
