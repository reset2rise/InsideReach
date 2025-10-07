import Hero from './components/Hero';
import MissionVision from './components/MissionVision';
import Programs from './components/Programs';
import WinnersCircle from './components/WinnersCircle';
import MarriageEnrichment from './components/MarriageEnrichment';
import BridgeBuilders from './components/BridgeBuilders';
import About from './components/About';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MissionVision />
      <Programs />
      <WinnersCircle />
      <MarriageEnrichment />
      <BridgeBuilders />
      <About />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
