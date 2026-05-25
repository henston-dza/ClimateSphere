const LoadingSpinner = ({ size = 'md', text }) => {
  return (
    <div className="spinner-overlay">
      <div style={{ textAlign: 'center' }}>
        <div className={`spinner ${size === 'sm' ? 'spinner-sm' : ''}`} />
        {text && (
          <p
            style={{
              marginTop: 'var(--space-md)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-sm)',
            }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
