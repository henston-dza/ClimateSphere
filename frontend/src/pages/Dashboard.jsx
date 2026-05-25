import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { WiDaySunny } from 'react-icons/wi';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import AirQualityCard from '../components/AirQualityCard';
import FavoritesList from '../components/FavoritesList';
import TemperatureChart from '../components/TemperatureChart';
import WeatherBackground from '../components/WeatherBackground';
import LoadingSpinner from '../components/LoadingSpinner';
import { weatherApi } from '../services/weatherApi';
import { favoritesApi } from '../services/favoritesApi';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  // Weather state
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Favorites state
  const [favorites, setFavorites] = useState([]);
  const [favLoading, setFavLoading] = useState(false);

  // History state
  const [history, setHistory] = useState([]);

  // Settings
  const [unit, setUnit] = useState(() => localStorage.getItem('tempUnit') || 'C');
  const [toast, setToast] = useState(null);

  // Load favorites and history on mount
  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  // Persist unit preference
  useEffect(() => {
    localStorage.setItem('tempUnit', unit);
  }, [unit]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadFavorites = async () => {
    try {
      const data = await favoritesApi.getFavorites();
      setFavorites(data);
    } catch {
      // Silently fail
    }
  };

  const loadHistory = async () => {
    try {
      const data = await weatherApi.getSearchHistory();
      setHistory(data);
    } catch {
      // Silently fail
    }
  };

  const searchCity = useCallback(async (city) => {
    setLoading(true);
    setError('');
    setCurrentWeather(null);
    setForecast(null);
    setAirQuality(null);

    try {
      // Fetch all three in parallel
      const [weather, forecastData, aqiData] = await Promise.allSettled([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city),
        weatherApi.getAirQuality(city),
      ]);

      if (weather.status === 'fulfilled') {
        setCurrentWeather(weather.value);
      } else {
        throw new Error(
          weather.reason?.response?.data?.message || 'Failed to fetch weather data'
        );
      }

      if (forecastData.status === 'fulfilled') {
        setForecast(forecastData.value);
      }

      if (aqiData.status === 'fulfilled') {
        setAirQuality(aqiData.value);
      }

      // Refresh history
      loadHistory();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch weather data. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFavoriteToggle = async (city) => {
    const isFav = favorites.some(
      (f) => f.toLowerCase() === city.toLowerCase()
    );

    try {
      if (isFav) {
        await favoritesApi.removeFavorite(city);
        setFavorites((prev) =>
          prev.filter((f) => f.toLowerCase() !== city.toLowerCase())
        );
        showToast(`${city} removed from favorites`);
      } else {
        await favoritesApi.addFavorite(city);
        setFavorites((prev) => [...prev, city]);
        showToast(`${city} added to favorites`);
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to update favorites',
        'error'
      );
    }
  };

  const handleClearHistory = async () => {
    try {
      await weatherApi.clearHistory();
      setHistory([]);
      showToast('Search history cleared');
    } catch {
      showToast('Failed to clear history', 'error');
    }
  };

  const isCityFavorite = (cityName) => {
    return favorites.some(
      (f) => f.toLowerCase() === cityName?.toLowerCase()
    );
  };

  return (
    <>
      <Navbar />
      <WeatherBackground />

      <div className="dashboard">
        {/* Search Section */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto var(--space-xl)',
            padding: '0 var(--space-lg)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1
              style={{
                fontSize: 'var(--font-2xl)',
                fontWeight: 800,
                marginBottom: 'var(--space-xs)',
              }}
            >
              Welcome back, {user?.username || 'Explorer'} 👋
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-xl)',
                fontSize: 'var(--font-base)',
              }}
            >
              Search for any city to get real-time weather data
            </p>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar
              onSearch={searchCity}
              history={history}
              onClearHistory={handleClearHistory}
              loading={loading}
            />
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                maxWidth: 600,
                margin: '0 auto var(--space-xl)',
                padding: '1rem 1.25rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--danger)',
                fontSize: 'var(--font-sm)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiAlertCircle size={16} />
                {error}
              </span>
              <button onClick={() => setError('')}>
                <FiX size={16} color="var(--danger)" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && <LoadingSpinner text="Fetching weather data..." />}

        {/* Empty State */}
        {!loading && !currentWeather && !error && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ minHeight: 300 }}
          >
            <WiDaySunny className="empty-state-icon" size={80} />
            <h3>Search for a City</h3>
            <p>
              Enter a city name above to view current weather, forecasts, and
              air quality data.
            </p>
          </motion.div>
        )}

        {/* Main Content */}
        {currentWeather && !loading && (
          <div className="dashboard-grid">
            <div className="dashboard-main">
              {/* Current Weather */}
              <WeatherCard
                data={currentWeather}
                unit={unit}
                onToggleUnit={setUnit}
                onFavorite={handleFavoriteToggle}
                isFavorite={isCityFavorite(currentWeather.city)}
              />

              {/* Air Quality */}
              {airQuality && <AirQualityCard data={airQuality} />}

              {/* 5-Day Forecast */}
              {forecast && (
                <motion.div
                  className="forecast-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="section-title">
                    📅 5-Day Forecast
                  </h2>
                  <div className="forecast-grid">
                    {forecast.daily.map((day, i) => (
                      <ForecastCard
                        key={day.date}
                        data={day}
                        unit={unit}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Temperature Chart */}
              {forecast && (
                <TemperatureChart forecast={forecast} unit={unit} />
              )}
            </div>

            {/* Sidebar */}
            <div className="dashboard-sidebar">
              <FavoritesList
                favorites={favorites}
                onSelect={searchCity}
                onRemove={handleFavoriteToggle}
                loading={favLoading}
              />

              {/* Recent Searches in sidebar */}
              {history.length > 0 && (
                <motion.div
                  className="favorites-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="favorites-header">
                    <h3>🕐 Recent</h3>
                    <button
                      onClick={handleClearHistory}
                      style={{
                        fontSize: 'var(--font-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="favorites-list">
                    {history.slice(0, 8).map((item, i) => (
                      <div
                        key={i}
                        className="favorite-item"
                        onClick={() => searchCity(item.city)}
                      >
                        <span className="favorite-city">{item.city}</span>
                        <span
                          style={{
                            fontSize: 'var(--font-xs)',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {new Date(item.searchedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            onClick={() => setToast(null)}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
