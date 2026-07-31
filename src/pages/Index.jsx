import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Program from "../components/Program";
import Classes from "../components/Classes";
import ChooseUs from "../components/ChooseUs";
import Team from "../components/Team";
import Counter from "../components/Counter";
import Session from "../components/Session";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";
import News from "../components/News";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Program />
        <Classes />
        <ChooseUs />
        <Team />
        <Counter />
        <Session />
        <Testimonial />
        <Contact />
        <News />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}