"use client";
import React from "react";
import styles from "./FeaturedSection.module.css";
import { useFeaturedTrips } from "@/hooks/hooks";
import Loading from "../common/loading/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FeaturedSection() {
  const { featuredTrips, isError, isLoading } = useFeaturedTrips();

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong...</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.featuredSectionWrapper}>
      <h2 className={styles.sectionTitle}>Featured trips</h2>
      <div className={styles.cardSlider}>
        <Slider {...sliderSettings}>
          {featuredTrips &&
            featuredTrips.map(
              (data) =>
                data.preview?.source && (
                  <div key={data.xid} className={styles.card}>
                    <img
                      src={data.preview?.source}
                      alt={data.name}
                      className={styles.image}
                    />
                    <h4 className={styles.countryTitle}>
                      {data.address.country}
                    </h4>
                    <p>
                      {data.wikipedia_extracts?.text
                        .split(" ", 8)
                        .join(" ")
                        .concat("...")}
                    </p>
                    <a
                      href={`/trip/${data.xid}`}
                      className={styles.resultButton}
                    >
                      View details
                    </a>
                  </div>
                )
            )}
        </Slider>
      </div>
    </div>
  );
}

export default FeaturedSection;
