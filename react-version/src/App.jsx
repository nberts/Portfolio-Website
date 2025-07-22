import About from './sections/About';
import Blog from './sections/Blog';
import Header from './sections/Header';
import Portfolio from './sections/Porfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <About />
      <div className='section-divider-div'></div>
      <Portfolio />
      <div className='section-divider-div'></div>
      <Blog />
      <div className='section-divider-div'></div>
      <Contact />
      <Footer />
    </div>
  );
}

export default App
