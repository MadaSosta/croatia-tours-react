import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer id={styles.footer}>
      <div className={styles.footerWrapper}>
        <p className={styles.footerText}>© Created by Ivan Mađarčić Šoštarić</p>
        <ul className={styles.list}>
          <li className={`${styles.listItem} ${styles.facebook} ${styles.up}`}>
            <a href="#">
              <FaFacebook size={20} />
            </a>
          </li>
          <li className={`${styles.listItem} ${styles.twitter} ${styles.up}`}>
            <a href="#">
              <FaTwitter size={20} />
            </a>
          </li>
          <li className={`${styles.listItem} ${styles.instagram} ${styles.up}`}>
            <a href="#">
              <FaInstagram size={20} />
            </a>
          </li>
          <li className={`${styles.listItem} ${styles.google} ${styles.up}`}>
            <a href="#">
              <FaGoogle size={20} />
            </a>
          </li>
          <li className={`${styles.listItem} ${styles.whatsapp} ${styles.up}`}>
            <a href="#">
              <FaWhatsapp size={20} />
            </a>
          </li>
        </ul>
        <p className={styles.footerText}>All rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
