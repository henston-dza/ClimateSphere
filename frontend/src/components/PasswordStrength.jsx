import { useMemo } from 'react';

const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return { level: '', score: 0 };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 'weak', label: 'Weak' };
    if (score <= 2) return { level: 'medium', label: 'Medium' };
    if (score <= 3) return { level: 'strong', label: 'Strong' };
    return { level: 'very-strong', label: 'Very Strong' };
  }, [password]);

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div className={`strength-fill ${strength.level}`} />
      </div>
      <span className={`strength-label ${strength.level}`}>{strength.label}</span>
    </div>
  );
};

export default PasswordStrength;
