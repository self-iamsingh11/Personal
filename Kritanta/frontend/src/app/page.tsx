'use client';

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import CategorySection from "@/components/common/CategorySection";
import PromoGrid from "@/components/common/PromoGrid";
import YoutubeGrid from "@/components/common/YoutubeGrid";
import InstagramGrid from "@/components/common/InstagramGrid";
import ReviewsCarousel from "@/components/common/ReviewsCarousel";
import WhyChooseUs from "@/components/common/WhyChooseUs";
import FAQ from "@/components/common/FAQ";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pt-[120px]">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <PromoGrid />
      <YoutubeGrid />
      <InstagramGrid />
      <WhyChooseUs />
      <ReviewsCarousel />
      <FAQ />
      <Footer />
    </main>
  );
}
