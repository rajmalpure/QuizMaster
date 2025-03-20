import React, { useState } from 'react';

const LandingPage = ({ onStartQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Styles object containing all the CSS
  const styles = {
    landingPage: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    navbar: {
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#4361ee',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    navLinksActive: {
      display: 'flex',
      gap: '2rem',
      '@media (max-width: 768px)': {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
    navLink: {
      textDecoration: 'none',
      color: '#212529',
      fontWeight: 500,
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#4361ee',
    },
    authButtons: {
      display: 'flex',
      gap: '1rem',
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    authButtonsActive: {
      display: 'flex',
      gap: '1rem',
      '@media (max-width: 768px)': {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '120px',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
    btn: {
      padding: '0.6rem 1.2rem',
      borderRadius: '6px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block',
    },
    btnOutline: {
      border: '2px solid #4361ee',
      color: '#4361ee',
      background: 'transparent',
    },
    btnPrimary: {
      backgroundColor: '#4361ee',
      color: 'white',
      border: 'none',
    },
    btnLarge: {
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      borderRadius: '8px',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      cursor: 'pointer',
      '@media (max-width: 768px)': {
        display: 'flex',
      },
    },
    hamburgerLine: {
      display: 'block',
      width: '25px',
      height: '3px',
      backgroundColor: '#212529',
      transition: 'all 0.3s',
    },
    hamburgerLineActive1: {
      transform: 'rotate(45deg) translate(5px, 6px)',
    },
    hamburgerLineActive2: {
      opacity: 0,
    },
    hamburgerLineActive3: {
      transform: 'rotate(-45deg) translate(5px, -6px)',
    },
    hero: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%',
      background: 'linear-gradient(120deg, #e0e7ff 0%, #f0f4ff 100%)',
      marginTop: '64px', // Add this to account for fixed navbar
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4rem',
      '@media (max-width: 1024px)': {
        flexDirection: 'column-reverse',
        textAlign: 'center',
        gap: '2rem',
      },
    },
    heroText: {
      flex: 1,
    },
    heroTitle: {
      fontSize: '3.5rem',
      marginBottom: '1rem',
      lineHeight: 1.2,
      color: '#4361ee',
      '@media (max-width: 768px)': {
        fontSize: '2.5rem',
      },
    },
    heroDescription: {
      fontSize: '1.2rem',
      color: '#6c757d',
      marginBottom: '2rem',
    },
    features: {
      display: 'flex',
      gap: '1.5rem',
      marginTop: '3rem',
      '@media (max-width: 1024px)': {
        flexDirection: 'column',
      },
    },
    feature: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s',
    },
    featureHover: {
      transform: 'translateY(-5px)',
    },
    featureIcon: {
      fontSize: '2rem',
      color: '#4361ee',
      marginBottom: '1rem',
    },
    featureTitle: {
      marginBottom: '0.5rem',
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center',
      '@media (max-width: 1024px)': {
        justifyContent: 'center',
      },
    },
    heroImage: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    heroImg: {
      maxWidth: '100%',
      height: 'auto',
    },
  };

  // Function to combine styles
  const combineStyles = (...styles) => {
    return Object.assign({}, ...styles);
  };

  return (
    <div style={styles.landingPage}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <a href="#" style={styles.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          QuizMaster
        </a>
        
        <div style={mobileMenuOpen ? styles.navLinksActive : styles.navLinks}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>Categories</a>
          <a href="#" style={styles.navLink}>Leaderboard</a>
          <a href="#" style={styles.navLink}>About</a>
        </div>
        
        <div style={styles.hamburger} onClick={toggleMobileMenu}>
          <span style={combineStyles(
            styles.hamburgerLine,
            mobileMenuOpen && styles.hamburgerLineActive1
          )}></span>
          <span style={combineStyles(
            styles.hamburgerLine,
            mobileMenuOpen && styles.hamburgerLineActive2
          )}></span>
          <span style={combineStyles(
            styles.hamburgerLine,
            mobileMenuOpen && styles.hamburgerLineActive3
          )}></span>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Test Your Knowledge with Exciting Quizzes</h1>
            <p style={styles.heroDescription}>Engage with challenging quizzes across various categories. Learn, compete, and track your progress with our interactive platform.</p>
            
            <div style={styles.features}>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>🏆</div>
                <h3 style={styles.featureTitle}>Compete Globally</h3>
                <p>Join thousands of quiz enthusiasts and see where you rank.</p>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>📚</div>
                <h3 style={styles.featureTitle}>Learn Anything</h3>
                <p>From science to pop culture, we've got every topic covered.</p>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>📊</div>
                <h3 style={styles.featureTitle}>Track Progress</h3>
                <p>Monitor your improvements with detailed analytics.</p>
              </div>
            </div>
            
            <div style={styles.ctaButtons}>
              <button 
                onClick={onStartQuiz} 
                style={combineStyles(styles.btn, styles.btnPrimary, styles.btnLarge)}
              >
                Start Quiz Now
              </button>
              
            </div>
          </div>
          
          
        </div>
      </section>
    </div>
  );
};

export default LandingPage;