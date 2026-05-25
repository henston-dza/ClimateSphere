import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

const TemperatureChart = ({ forecast, unit }) => {
  if (!forecast || !forecast.hourly || forecast.hourly.length === 0) return null;

  const convertTemp = (val) => {
    if (unit === 'F') return parseFloat(((val * 9) / 5 + 32).toFixed(1));
    return parseFloat(val.toFixed(1));
  };

  // Take first 16 data points (48 hours)
  const chartData = forecast.hourly.slice(0, 16).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temp: convertTemp(item.temp),
    feelsLike: convertTemp(item.feelsLike),
  }));

  const unitLabel = unit === 'F' ? '°F' : '°C';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <p style={{ fontWeight: 600, fontSize: 'var(--font-sm)', marginBottom: '4px' }}>
            {label}
          </p>
          <p style={{ color: 'var(--primary-500)', fontSize: 'var(--font-sm)' }}>
            Temp: {payload[0].value}{unitLabel}
          </p>
          {payload[1] && (
            <p style={{ color: 'var(--accent-500)', fontSize: 'var(--font-sm)' }}>
              Feels: {payload[1].value}{unitLabel}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3
        className="section-title"
        style={{ marginBottom: 'var(--space-lg)' }}
      >
        <FiTrendingUp className="icon" size={20} />
        Temperature Trend
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border-light)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}°`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#tempGradient)"
          />
          <Area
            type="monotone"
            dataKey="feelsLike"
            stroke="#f97316"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="url(#feelsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-xl)',
          justifyContent: 'center',
          marginTop: 'var(--space-md)',
          fontSize: 'var(--font-xs)',
          color: 'var(--text-tertiary)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 16, height: 3, background: '#3b82f6', borderRadius: 2 }} />
          Temperature
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: 16,
              height: 3,
              background: '#f97316',
              borderRadius: 2,
              borderStyle: 'dashed',
            }}
          />
          Feels Like
        </span>
      </div>
    </motion.div>
  );
};

export default TemperatureChart;
