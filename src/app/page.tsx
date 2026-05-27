import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <FeaturedWork />
        <WhyUs />
        <Process />
        <ContactCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
