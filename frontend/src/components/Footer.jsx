import { WiDaySunny } from 'react-icons/wi';
import { FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <WiDaySunny size={28} />
            <span className="gradient">ClimateSphere</span>
          </div>
          <p>
            Your premium weather companion. Get accurate, real-time weather
            forecasts and air quality data for cities worldwide.
          </p>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How it Works</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">API Docs</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#changelog">Changelog</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiGithub size={14} /> GitHub
              </a>
            </li>
            <li>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiTwitter size={14} /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ClimateSphere. Made with{' '}
          <FiHeart size={12} style={{ color: '#ef4444', verticalAlign: 'middle' }} />{' '}
          using OpenWeather API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
