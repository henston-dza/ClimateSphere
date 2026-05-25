import { FiHeart, FiX, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesList = ({ favorites, onSelect, onRemove, loading }) => {
  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <FiHeart size={18} color="var(--danger)" />
          Favorites
        </h3>
        <span
          style={{
            fontSize: 'var(--font-xs)',
            color: 'var(--text-tertiary)',
          }}
        >
          {favorites.length}/20
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <FiMapPin size={24} style={{ marginBottom: '8px', opacity: 0.4 }} />
          <p>No favorite cities yet. Search for a city and tap the heart icon.</p>
        </div>
      ) : (
        <div className="favorites-list">
          <AnimatePresence>
            {favorites.map((city) => (
              <motion.div
                key={city}
                className="favorite-item"
                onClick={() => onSelect(city)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <span className="favorite-city">
                  <FiMapPin size={12} style={{ marginRight: '6px', opacity: 0.5 }} />
                  {city}
                </span>
                <button
                  className="favorite-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(city);
                  }}
                  aria-label={`Remove ${city}`}
                >
                  <FiX size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
