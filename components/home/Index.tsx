import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import TourSection from "./TourSection";
import LandscapeSection from "./LandscapeSection";
import ContactSection from "./ContactSection";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeWrapper}>
      <HeroSection />
      <AboutSection />
      <TourSection />
      <LandscapeSection />
      <ContactSection />
    </div>
  );
}

export default Home;
