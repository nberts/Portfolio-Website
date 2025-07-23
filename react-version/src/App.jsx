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
      <div id='about'><About /></div>
      <div className='section-divider-div'></div>
      <div id='portfolio'><Portfolio /></div>
      <div className='section-divider-div'></div>
      <div id='blog'><Blog /></div>
      <div id='contact'><Contact /></div>
      <Footer />
    </div>
  );
}

export default App
