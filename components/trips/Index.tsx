import React from "react";
import styles from "./Trips.module.css";
import HeroSection from "./HeroSection";
import FeaturedSection from "./FeaturedSection";

function Trips() {
  return (
    <div className={styles.tripsWrapper}>
      <div className={styles.tripsContainer}>
        <HeroSection />
        <FeaturedSection />
      </div>
    </div>
  );
}

export default Trips;
