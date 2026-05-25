import { motion } from 'framer-motion';
import { WiSmoke } from 'react-icons/wi';

const AirQualityCard = ({ data }) => {
  if (!data) return null;

  const aqiConfig = {
    1: { label: 'Good', class: 'good', percent: 10 },
    2: { label: 'Fair', class: 'fair', percent: 30 },
    3: { label: 'Moderate', class: 'moderate', percent: 50 },
    4: { label: 'Poor', class: 'poor', percent: 70 },
    5: { label: 'Very Poor', class: 'very-poor', percent: 90 },
  };

  const config = aqiConfig[data.aqi] || aqiConfig[1];

  const components = [
    { name: 'PM2.5', value: data.components.pm2_5, unit: 'μg/m³' },
    { name: 'PM10', value: data.components.pm10, unit: 'μg/m³' },
    { name: 'O₃', value: data.components.o3, unit: 'μg/m³' },
    { name: 'NO₂', value: data.components.no2, unit: 'μg/m³' },
    { name: 'SO₂', value: data.components.so2, unit: 'μg/m³' },
    { name: 'CO', value: data.components.co, unit: 'μg/m³' },
  ];

  return (
    <motion.div
      className="aqi-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="aqi-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <WiSmoke size={24} color="var(--primary-400)" />
          Air Quality
        </h3>
        <span className={`aqi-badge ${config.class}`}>{config.label}</span>
      </div>

      <div className="aqi-meter">
        <div
          className="aqi-meter-indicator"
          style={{ left: `calc(${config.percent}% - 8px)` }}
        />
      </div>

      <div className="aqi-components">
        {components.map((comp) => (
          <div key={comp.name} className="aqi-component">
            <div className="aqi-component-name">{comp.name}</div>
            <div className="aqi-component-value">
              {comp.value?.toFixed(1) ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AirQualityCard;
