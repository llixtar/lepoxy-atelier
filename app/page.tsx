import Hero from "@/components/sections/Hero";
import Values from "@/components/sections/Values";
import Collections from "@/components/sections/Collections";
import Order from "@/components/sections/Order";
import Process from "@/components/sections/Process";
import AvailableBags from "@/components/sections/AvailableBags";
import Reviews from "@/components/sections/Reviews";
import InstagramWidget from "@/components/sections/InstagramWidget";
import ComparisonSlider from '@/components/sections/ComparisonSlider';

export default function Home() {
  return (
    <>
      <Hero />
      <Values />
      <ComparisonSlider />
      <Collections />
      <Order />
      <Process />
      <AvailableBags />
      <Reviews />
      <InstagramWidget />
    </>
  );
}