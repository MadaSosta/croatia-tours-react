"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { FiMenu } from "react-icons/fi";
import { auth } from "@/config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { handleHeaderScroll } from "@/lib/utils";
import { cinzelDecorative } from "@/constants/consts";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasBackgroundApplied, setHasBackgroundApplied] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        handleHeaderScroll(
          hasBackgroundApplied,
          setHasBackgroundApplied,
          headerRef
        )
      );
    }

    return () => {
      window.removeEventListener("scroll", () =>
        handleHeaderScroll(
          hasBackgroundApplied,
          setHasBackgroundApplied,
          headerRef
        )
      );
    };
  }, [hasBackgroundApplied]);

  return (
    <header
      ref={headerRef}
      id={styles.header}
      className={`${hasBackgroundApplied && styles.hasBackground}`}
    >
      <div className={styles.logo}>
        <Image src="/images/logo.svg" alt="logo" width={60} height={60} />
        <span className={`${styles.logoText} ${cinzelDecorative.className}`}>
          CROATIA
        </span>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen && styles.open}`}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Home
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/#about" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              About
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/#landscapes"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Landscapes
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/#join" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Contact
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/trips" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Trips
            </Link>
          </li>
          {user && !loading ? (
            <li className={styles.listItem}>
              <span className={styles.listItem}>{user.displayName}</span>
              <button
                className={styles.logoutButton}
                type="button"
                onClick={() => auth.signOut()}
              >
                <RiLogoutBoxRLine size={20} className={styles.logoutIcon} />
              </button>
            </li>
          ) : (
            <li className={styles.listItem}>
              <Link href="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <button
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FiMenu size={30} className={styles.menuIcon} />
      </button>
    </header>
  );
}

export default Header;
