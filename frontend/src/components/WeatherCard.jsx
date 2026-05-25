import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiDust,
} from 'react-icons/wi';
import { FiEye, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const WeatherCard = ({ data, unit, onToggleUnit, onFavorite, isFavorite }) => {
  if (!data) return null;

  const temp = (val) => {
    if (unit === 'F') return ((val * 9) / 5 + 32).toFixed(1);
    return val.toFixed(1);
  };

  const unitSymbol = unit === 'F' ? '°F' : '°C';

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className="weather-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-card-header">
        <div>
          <h2 className="weather-city">{data.city}</h2>
          <p className="weather-country">
            {data.state ? `${data.state}, ` : ''}
            {data.country}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <div className="unit-toggle">
            <button
              className={unit === 'C' ? 'active' : ''}
              onClick={() => onToggleUnit('C')}
            >
              °C
            </button>
            <button
              className={unit === 'F' ? 'active' : ''}
              onClick={() => onToggleUnit('F')}
            >
              °F
            </button>
          </div>
          {onFavorite && (
            <button
              className="btn btn-icon btn-ghost"
              onClick={() => onFavorite(data.city)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              id="favorite-toggle-btn"
            >
              <FiHeart
                size={18}
                fill={isFavorite ? 'var(--danger)' : 'none'}
                color={isFavorite ? 'var(--danger)' : 'var(--text-tertiary)'}
              />
            </button>
          )}
        </div>
      </div>

      <div className="weather-temp-main">
        <div>
          <span className="weather-temp-value">{temp(data.temperature)}</span>
          <span className="weather-temp-unit">{unitSymbol}</span>
        </div>
        <div className="weather-condition">
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${data.weather.icon}@4x.png`}
            alt={data.weather.description}
          />
          <span className="weather-description">{data.weather.description}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <WiHumidity className="weather-detail-icon" size={28} />
          <span className="weather-detail-value">{data.humidity}%</span>
          <span className="weather-detail-label">Humidity</span>
        </div>
        <div className="weather-detail">
          <WiStrongWind className="weather-detail-icon" size={28} />
          <span className="weather-detail-value">{data.windSpeed} m/s</span>
          <span className="weather-detail-label">Wind</span>
        </div>
        <div className="weather-detail">
          <WiBarometer className="weather-detail-icon" size={28} />
          <span className="weather-detail-value">{data.pressure} hPa</span>
          <span className="weather-detail-label">Pressure</span>
        </div>
        <div className="weather-detail">
          <FiEye className="weather-detail-icon" size={22} />
          <span className="weather-detail-value">
            {(data.visibility / 1000).toFixed(1)} km
          </span>
          <span className="weather-detail-label">Visibility</span>
        </div>
        <div className="weather-detail">
          <WiSunrise className="weather-detail-icon" size={28} />
          <span className="weather-detail-value">{formatTime(data.sunrise)}</span>
          <span className="weather-detail-label">Sunrise</span>
        </div>
        <div className="weather-detail">
          <WiSunset className="weather-detail-icon" size={28} />
          <span className="weather-detail-value">{formatTime(data.sunset)}</span>
          <span className="weather-detail-label">Sunset</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
