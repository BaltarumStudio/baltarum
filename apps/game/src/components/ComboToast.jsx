import { motion, AnimatePresence } from 'framer-motion';

export default function ComboToast({ show, text }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed', top: 14, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(16,185,129,.12)', border: '1px solid #10b981',
            padding: '8px 14px', borderRadius: 10, fontWeight: 800, color: '#d1fae5',
            boxShadow: '0 10px 26px rgba(16,185,129,.2)', zIndex: 50
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
