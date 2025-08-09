export const RARITY_COLORS = {
  common:  '#6b7280',  // серый
  rare:    '#2563eb',  // синий
  epic:    '#9333ea',  // фиолет
  legendary:'#f59e0b', // золото
};

export const JOKERS = [
  {
    id: 'extra-play',
    name: '+1 Play',
    rarity: 'rare',
    desc: 'One extra Play per round.',
    effect: (state) => ({ ...state, plays: state.plays + 1 }),
  },
  {
    id: 'pair-mult',
    name: 'Pair x1.5',
    rarity: 'epic',
    desc: 'Pairs score x1.5.',
    effect: (scoreCtx) => {
      if (scoreCtx.combo === 'Pair') scoreCtx.mult *= 1.5;
      return scoreCtx;
    }
  },
  {
    id: 'flush-bonus',
    name: 'Flush +15',
    rarity: 'legendary',
    desc: 'Flush gives +15 flat points.',
    effect: (scoreCtx) => {
      if (scoreCtx.combo === 'Flush') scoreCtx.bonus += 15;
      return scoreCtx;
    }
  },
];
