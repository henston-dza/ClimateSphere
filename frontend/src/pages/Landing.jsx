import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiThunderstorm,
} from 'react-icons/wi';
import {
  FiSearch,
  FiShield,
  FiZap,
  FiMap,
  FiArrowRight,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const featuredCities = [
    {
      city: 'London',
      temp: '18°C',
      condition: 'Cloudy',
      icon: <WiCloudy size={48} />,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    {
      city: 'Tokyo',
      temp: '26°C',
      condition: 'Sunny',
      icon: <WiDaySunny size={48} />,
      gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
    },
    {
      city: 'New York',
      temp: '22°C',
      condition: 'Rain',
      icon: <WiRain size={48} />,
      gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      desc: 'Sign up in seconds with email or Google OAuth for instant access.',
    },
    {
      number: '2',
      title: 'Search Any City',
      desc: 'Look up current weather, forecasts, and air quality worldwide.',
    },
    {
      number: '3',
      title: 'Save Favorites',
      desc: 'Bookmark cities for quick access to weather updates anytime.',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        {/* Animated weather icons background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {[WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm].map(
            (Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.04 }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.04, 0.08, 0.04],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.5,
                }}
                style={{
                  position: 'absolute',
                  color: 'white',
                  fontSize: `${80 + i * 30}px`,
                  top: `${10 + i * 18}%`,
                  left: `${5 + i * 20}%`,
                }}
              >
                <Icon />
              </motion.div>
            )
          )}
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ⚡ Real-time Weather Data Powered by OpenWeather
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Your Weather,{' '}
            <span className="gradient-text">Beautifully Delivered</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Accurate forecasts, air quality insights, and personalized weather
            tracking — all in one elegant dashboard built for weather
            enthusiasts.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Weather Cards */}
      <section className="featured-section" id="features">
        <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h2
            style={{
              fontSize: 'var(--font-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--space-sm)',
            }}
          >
            Weather Around the World
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
            Explore real-time conditions across major cities
          </p>
        </div>
        <div className="featured-grid">
          {featuredCities.map((item, i) => (
            <motion.div
              key={item.city}
              className="glass-card featured-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{
                padding: 'var(--space-2xl)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() =>
                isAuthenticated
                  ? navigate('/dashboard')
                  : navigate('/register')
              }
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  background: item.gradient,
                  borderRadius: '50%',
                  opacity: 0.15,
                  filter: 'blur(20px)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--font-xl)',
                      fontWeight: 700,
                      marginBottom: '2px',
                    }}
                  >
                    {item.city}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
                    {item.condition}
                  </p>
                </div>
                <div style={{ color: 'var(--primary-400)' }}>{item.icon}</div>
              </div>
              <p
                style={{
                  fontSize: 'var(--font-4xl)',
                  fontWeight: 800,
                  background: item.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {item.temp}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <p className="subtitle">Get started in three simple steps</p>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="featured-section">
        <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h2
            style={{
              fontSize: 'var(--font-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--space-sm)',
            }}
          >
            Powerful Features
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
            Everything you need for weather intelligence
          </p>
        </div>
        <div className="featured-grid" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          {[
            {
              icon: <FiSearch size={28} />,
              title: 'Smart Search',
              desc: 'Search any city worldwide with instant results and history tracking.',
            },
            {
              icon: <FiShield size={28} />,
              title: 'Secure & Private',
              desc: 'JWT authentication, encrypted passwords, and rate-limited APIs.',
            },
            {
              icon: <FiZap size={28} />,
              title: 'Lightning Fast',
              desc: 'Cached responses and optimized APIs for instant weather data.',
            },
            {
              icon: <FiMap size={28} />,
              title: 'Air Quality',
              desc: 'Real-time AQI monitoring with detailed pollutant breakdown.',
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'var(--gradient-ocean)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  margin: '0 auto var(--space-md)',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                }}
              >
                {feat.icon}
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-lg)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-sm)',
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--font-sm)',
                  lineHeight: 1.6,
                }}
              >
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'var(--gradient-ocean)',
          padding: 'var(--space-3xl) var(--space-lg)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <motion.h2
            style={{
              fontSize: 'var(--font-3xl)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 'var(--space-md)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Track Weather Like a Pro?
          </motion.h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 'var(--font-lg)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            Join ClimateSphere today — it's free.
          </p>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="btn btn-lg"
              style={{
                background: 'white',
                color: 'var(--primary-700)',
                fontWeight: 700,
              }}
            >
              Open Dashboard <FiArrowRight />
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn btn-lg"
              style={{
                background: 'white',
                color: 'var(--primary-700)',
                fontWeight: 700,
              }}
            >
              Get Started Free <FiArrowRight />
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
