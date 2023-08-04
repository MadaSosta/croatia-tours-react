import React from "react";
import Image from "next/image";
import { cinzelDecorative } from "@/constants/consts";
import styles from "./AboutSection.module.css";

function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <article className={styles.aboutInner}>
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutInfo}>
            <div className={styles.aboutInfoLeft}>
              <p className={styles.customHeading}>About Us</p>
              <p className={cinzelDecorative.className}>
                EXPERTLY CRAFTED TOURS TO CROATIA. 10 DAYS OF ADMIRING
                INCREDIBLE NATURE, BEAUTIFUL CITIES, NATIONAL PARKS, AND THE
                MAGNIFICENT MEDITERIAN SEA.
              </p>
            </div>

            <div className={styles.aboutInfoRight}>
              <p>
                We offer guided tours in Croatia - one of the most beautiful
                Slavic countries. We will cross the entire country, from Zagreb
                to Dubrovnik, visit amazing cities, and see stunning nature.
              </p>
              <p>
                The program is carefully thought out, there are no more than 10
                people in each group plus an English-speaking guide. Comfortable
                vans and nights in 3*+ hotels are included in the price.
              </p>
            </div>
          </div>
        </div>
      </article>

      <article className={styles.contactInfo}>
        <div className={styles.contactInfoInner}>
          <div className={`${styles.contact} ${styles.contactCard}`}>
            <h1>1</h1>
            <h4 className={cinzelDecorative.className}>Contact us</h4>
            <p>
              Some tour conditions may be changed according to the season. To
              learn more about the program, please contact us.
            </p>
          </div>
          <div className={`${styles.date} ${styles.contactCard}`}>
            <h1>2</h1>
            <h4 className={cinzelDecorative.className}>Pick a date</h4>
            <p>
              We conduct tours all year round, almost every week, but the most
              comfortable weather for sightseeing is in summer.
            </p>
          </div>
          <div className={`${styles.start} ${styles.contactCard} `}>
            <h1>3</h1>
            <h4 className={cinzelDecorative.className}>Start your journey</h4>
            <p>
              If necessary, we help you apply for a visa to Croatia, as well as
              advise what things you should take with you.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AboutSection;
