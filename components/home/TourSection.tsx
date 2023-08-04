import React from "react";
import styles from "./TourSection.module.css";
import { FaThumbsUp, FaHiking, FaAward } from "react-icons/fa";

function TourSection() {
  return (
    <section className={styles.tour} id="tour">
      <article className={styles.tourWrapper}>
        <div className={styles.map}>
          <img src="images/karta.png" alt="karta" />
        </div>
        <div className={styles.tourRight}>
          <p className={styles.customHeading}>Tour</p>
          <h1>
            <span>From Zagreb</span> to Dubrovnik
          </h1>
          <p>
            We will travel through almost the entire country, from Zagreb to
            Dubrovnik. Many amazing places await us, including bustling cities,
            astonishing nature and fishing villages. You will see the real
            Croatia in all its glory.
          </p>
          <div className={styles.license}>
            <div className={styles.licenseCard}>
              <div className={styles.circle}>
                <FaAward className={styles.licenseCardIcon} />
              </div>
              <div className={styles.officialLicense}>
                <h2>Official License</h2>
                <p>
                  We are a licensed tour operator and have all the necessary
                  permits to conduct tours in Croatia.
                </p>
              </div>
            </div>
            <div className={styles.licenseCard}>
              <div className={styles.circle}>
                <FaHiking className={styles.licenseCardIcon} />
              </div>
              <div className={styles.ProfessionalGuide}>
                <h2>Professional Guide</h2>
                <p>
                  A professional guide will accompany you along the entire
                  route, who will show you the most beautiful places.
                </p>
              </div>
            </div>
            <div className={styles.licenseCard}>
              <div className={styles.circle}>
                <FaThumbsUp className={styles.licenseCardIcon} />
              </div>
              <div className={styles.satisfaction}>
                <h2>110% Satisfaction</h2>
                <p>
                  Croatia will steal your heart from the very first day of our
                  trip. It is impossible not to fall in love with it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default TourSection;
