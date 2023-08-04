import React from "react";
import styles from "./Trips.module.css";
import HeroSection from "./HeroSection";

function Trips() {
  return (
    <div className={styles.tripsWrapper}>
      <div className={styles.tripsContainer}>
        <HeroSection />
      </div>
    </div>
  );
}

export default Trips;
