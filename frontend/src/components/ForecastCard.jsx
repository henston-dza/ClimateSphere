import { motion } from 'framer-motion';

const ForecastCard = ({ data, unit, index }) => {
  if (!data) return null;

  const temp = (val) => {
    if (unit === 'F') return ((val * 9) / 5 + 32).toFixed(0);
    return val.toFixed(0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      className="forecast-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <p className="forecast-date">{formatDate(data.date)}</p>
      <img
        className="forecast-icon"
        src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
        alt={data.weather.description}
      />
      <div className="forecast-temps">
        <span className="forecast-temp-high">{temp(data.tempMax)}°</span>
        <span className="forecast-temp-low">{temp(data.tempMin)}°</span>
      </div>
      <p className="forecast-condition">{data.weather.description}</p>
    </motion.div>
  );
};

export default ForecastCard;
