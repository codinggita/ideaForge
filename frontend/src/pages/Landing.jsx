import { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ModulesSection from '../components/landing/ModulesSection';
import SuiteGrid from '../components/landing/SuiteGrid';
import CoreFlow from '../components/landing/CoreFlow';
import PricingSection from '../components/landing/PricingSection';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';
import { pricingPlans } from '../utils';

export default function LandingPage() {
  // We keep mock user references. You would tie this to Auth Providers context (Supabase, Auth0, etc).
  const [user] = useState(null);
  const [loading] = useState(false);

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#f6f3ee] text-[#243041]">
      {/* Background Graphic Visualizer - Kept absolute and ignored by dom flows via pointer-events-none */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,104,148,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(174,197,206,0.22),transparent_28%),linear-gradient(180deg,#fbfaf7_0%,#f3efe7_100%)]" />
        <div className="absolute right-[-6rem] top-[8rem] h-[22rem] w-[22rem] rounded-full bg-[#d7deec]/45 blur-3xl" />
        <div className="absolute left-[-8rem] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[#dbe6e8]/50 blur-3xl" />
      </div>

      <Navbar user={user} loading={loading} />
      <HeroSection user={user} />
      <ModulesSection />
      <SuiteGrid />
      <CoreFlow />
      {!loading && !user && <PricingSection plans={pricingPlans} />}
      <Testimonials />
      <Footer user={user} />
    </div>
  );
}
