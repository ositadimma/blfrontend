import React from "react";
import "./index.css";

const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">CryptoLend</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>
        </nav>
        <button className="cta">Get Started</button>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Peer-to-Peer Crypto Lending Made Easy</h1>
        <p>
          Borrow or lend cryptocurrency with transparency and security. Build your financial future with our decentralized platform.
        </p>
        <button className="cta">Start Lending</button>
        <button className="cta secondary">Learn More</button>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Why Choose CryptoLend?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Secure</h3>
            <p>Advanced blockchain technology ensures your funds are safe.</p>
          </div>
          <div className="feature">
            <h3>Transparent</h3>
            <p>Smart contracts provide full transparency for all transactions.</p>
          </div>
          <div className="feature">
            <h3>Flexible</h3>
            <p>Customizable loan terms to meet your unique needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Create an Account</h3>
            <p>Sign up in minutes and set up your crypto wallet.</p>
          </div>
          <div className="step">
            <h3>2. Browse Loans</h3>
            <p>Choose from a variety of loan options or create your own.</p>
          </div>
          <div className="step">
            <h3>3. Start Lending or Borrowing</h3>
            <p>Use smart contracts to manage secure, decentralized transactions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>
              "CryptoLend made it so easy to access liquidity when I needed it most!"
            </p>
            <h4>- Alex J.</h4>
          </div>
          <div className="testimonial">
            <p>"Lending my crypto has never been more transparent and secure."</p>
            <h4>- Priya K.</h4>
          </div>
          <div className="testimonial">
            <p>"I love the flexibility of customizing my loan terms. Highly recommended!"</p>
            <h4>- Michael T.</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <p>© 2024 BlockLend. All rights reserved.</p>
        <div className="socials">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default App;
