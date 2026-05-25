import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PasswordStrength from '../components/PasswordStrength';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      icon: <FiUser size={16} />,
      placeholder: 'Choose a username',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      icon: <FiMail size={16} />,
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      icon: <FiLock size={16} />,
      placeholder: 'Create a password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      icon: <FiLock size={16} />,
      placeholder: 'Confirm your password',
    },
  ];

  return (
    <div className="auth-page">
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 250,
          height: 250,
          background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join ClimateSphere for free weather intelligence</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              color: '#fca5a5',
              fontSize: 'var(--font-sm)',
            }}
          >
            <FiAlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="input-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {field.icon}
                </span>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className="input-field"
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {field.name === 'password' && (
                <PasswordStrength password={form.password} />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            id="register-submit-btn"
            style={{ width: '100%', marginTop: 'var(--space-sm)' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="spinner spinner-sm" style={{ borderTopColor: 'white' }} />
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <button className="google-btn" disabled id="google-register-btn">
          <FcGoogle size={20} />
          Sign up with Google (Coming Soon)
        </button>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
          <p style={{ marginTop: '8px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ← Back to home
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
