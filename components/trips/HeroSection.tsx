"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

import { BASE_API_URL } from "@/constants/consts";

import { FaSearch } from "react-icons/fa";
import { MdFastfood, MdBeachAccess } from "react-icons/md";
import { BiSolidHotel } from "react-icons/bi";
import { GrHomeOption } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";

import styles from "./HeroSection.module.css";

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = fetch(
      `https://${BASE_API_URL}/v1/reference-data​/locations​/hotels​/by-hotels?hotelIds=ACPAR419`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.AMADEUS_ACCESS_TOKEN,
        },
        mode: "cors",
      }
    )
      .then((res) => {
        if (res.ok) res.json();
        else throw new Error("Something went wrong");
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
    </div>
  );
}

export default HeroSection;
