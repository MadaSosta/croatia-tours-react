import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { cinzelDecorative } from "@/constants/consts";

function HeroSection() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroImageContainer}>
        <Image src="/images/hero-bg.jpg" alt="Croatia" fill priority />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroTitleContainer}>
          <p>Your perfect journey to</p>
          <h1 className={cinzelDecorative.className}>CROATIA</h1>
        </div>

        <div className={styles.heroVideo}>
          <div className={styles.introVideo}>
            <iframe
              id={styles.ytplayer}
              src="https://www.youtube.com/embed/T60_zAvnAsU"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Croatia Video"
            ></iframe>
          </div>
          <div className={styles.videoInfo}>
            <p>Next Trip to Croatia</p>
            <p>$4600 | 15 NOV. - 25 NOV.</p>
            <p>Visit the most extraordinary places throughout Croatia.</p>
            <p>Dream. Explore. Discover.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
