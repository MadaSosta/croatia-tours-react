"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { FiMenu } from "react-icons/fi";
import { Cinzel_Decorative } from "next/font/google";
import { auth } from "@/config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id={styles.header}>
      <div className={styles.logo}>
        <Image src="/images/logo.svg" alt="logo" width={80} height={80} />
        <span className={`${styles.logoText} ${cinzelDecorative.className}`}>
          Croatia
        </span>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen && styles.open}`}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/landscapes">Landscapes</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/contact">Contact</Link>
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
              <Link href="/login">Login</Link>
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
