import { motion } from 'framer-motion';

export default function Hand({ cards=[], selected=[], onToggle }) {
  return (
    <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
      {cards.map((c, i) => {
        const isSel = selected.includes(i);
        return (
          <motion.button
            key={i}
            onClick={() => onToggle(i)}
            whileHover={{ y: -6 }}
            animate={{ y: isSel ? -12 : 0, boxShadow: isSel ? '0 12px 24px rgba(16,185,129,.25)' : 'none' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              width: 84, height: 120, borderRadius: 12,
              border: `2px solid ${isSel? '#10b981' : 'rgba(255,255,255,.18)'}`,
              background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.0))',
              color:'#fff', cursor:'pointer'
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800 }}>{c.rank}</div>
            <div style={{ fontSize: 18, opacity: .9 }}>{c.suit}</div>
          </motion.button>
        );
      })}
    </div>
  );
}
