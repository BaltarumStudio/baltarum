import { RARITY_COLORS } from '../lib/jokers';
import { motion } from 'framer-motion';

export default function JokerPanel({ jokers = [] }) {
  return (
    <aside style={{ width: 260, padding: 12, display: 'grid', gap: 12 }}>
      {jokers.map(j => (
        <motion.div
          key={j.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            borderRadius: 12,
            border: `2px solid ${RARITY_COLORS[j.rarity]}`,
            padding: 12,
            background: 'rgba(255,255,255,.02)'
          }}
          title={j.desc}
        >
          <div style={{ fontWeight: 800 }}>{j.name}</div>
          <div style={{ opacity: .8, fontSize: 13 }}>{j.desc}</div>
          <div style={{ fontSize: 12, opacity: .6, marginTop: 6 }}>
            Rarity: {j.rarity}
          </div>
        </motion.div>
      ))}
    </aside>
  );
}
