"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { MdFastfood, MdBeachAccess } from "react-icons/md";
import { BiSolidHotel } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";

import styles from "./HeroSection.module.css";
import { TRadius, TRadiusApiResponse } from "@/types/typings";

type TResponse = {
  radiusData: TRadiusApiResponse;
};

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<TRadius[]>([]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({ searchQuery });

    try {
      const res = await fetch("/api/trips?" + searchParams, {
        method: "GET",
      });
      const { radiusData } = (await res.json()) as TResponse;

      /* Collect all radiuses from returned data */
      const radiusesArray = radiusData.features.map((item) => item.properties);

      setData(radiusesArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.HeroSectionWrapper}>
      <h1 className={styles.sectionTitle}>Where to?</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li
            className={`${styles.listItem} ${
              activeIndex === 0 && styles.active
            }`}
            onClick={() => setActiveIndex(0)}
          >
            <button type="button" className={styles.listButton}>
              <RxDashboard className={styles.icon} />
              Search all
            </button>
          </li>
          <li
            className={`${styles.listItem} ${
              activeIndex === 1 && styles.active
            }`}
            onClick={() => setActiveIndex(1)}
          >
            <button type="button" className={styles.listButton}>
              <MdBeachAccess className={styles.icon} />
              Things to do
            </button>
          </li>
          <li
            className={`${styles.listItem} ${
              activeIndex === 2 && styles.active
            }`}
            onClick={() => setActiveIndex(2)}
          >
            <button type="button" className={styles.listButton}>
              <MdFastfood className={styles.icon} />
              Restaurants
            </button>
          </li>
          <li
            className={`${styles.listItem} ${
              activeIndex === 3 && styles.active
            }`}
            onClick={() => setActiveIndex(3)}
          >
            <button type="button" className={styles.listButton}>
              <BiSolidHotel className={styles.icon} />
              Hotels
            </button>
          </li>
        </ul>
      </nav>
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Where would You like to go?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton}>
          <FaSearch className={styles.icon} />
        </button>
      </form>
      {data.length > 0 && (
        <div className={styles.resultsWrapper}>
          <h2>Search results for {searchQuery}</h2>
          {data.map(
            (item) =>
              item.name && (
                <div className={styles.resultContainer} key={item.xid}>
                  <h3 className={styles.resultTitle}>{item.name}</h3>
                  <Link
                    href={`/trip/${item.xid}`}
                    className={styles.resultButton}
                  >
                    View details
                  </Link>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default HeroSection;
