import { FaPaperPlane, FaMapMarkerAlt, FaMobileAlt } from "react-icons/fa";
import styles from "./ContactSection.module.css";
import { cinzelDecorative } from "@/constants/consts";

function ContactSection() {
  return (
    <div className={styles.contactMain}>
      <section className={styles.join} id="join">
        <article className={styles.joinWrapper}>
          <p className={styles.customHeading}>Start your journey!</p>
          <p>
            Complete the form below, and we will contact you soon to discuss the
            details!
          </p>
          <form className={styles.form}>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                className={styles.name}
                name="name"
                placeholder="Your Name"
                required={true}
              />
            </label>
            <br />
            <label htmlFor="phone">
              <input
                type="text"
                id="phone"
                className={styles.phone}
                name="phone"
                placeholder="Your Phone"
                required={true}
              />
            </label>
            <br />
            <label htmlFor="email">
              <input
                type="text"
                id="email"
                className={styles.email}
                name="email"
                placeholder="Your Email"
                required={true}
              />
            </label>
            <br />
            <label htmlFor="date">
              <input
                type="date"
                id="date"
                className={styles.date}
                name="date"
                required={true}
              />
            </label>
            <br />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </form>
        </article>
      </section>

      <section className={styles.contactEnd} id="contact">
        <hr className={styles.line} />
        <div className={styles.contacts}>
          <div className={`${styles.write} ${styles.contactCard}`}>
            <div className={styles.circle}>
              <FaPaperPlane className={styles.paperPlane} />
            </div>
            <h4 className={cinzelDecorative.className}>Write Us</h4>
            <p>croatia-tour@gmail.com</p>
          </div>

          <div className={`${styles.visit} ${styles.contactCard}`}>
            <div className={styles.circle}>
              <FaMapMarkerAlt className={styles.locationDot} />
            </div>
            <h4 className={cinzelDecorative.className}>Visit Us</h4>
            <p>Palmotićeva ul. 58, 10000, Zagreb</p>
          </div>

          <div className={`${styles.call} ${styles.contactCard}`}>
            <div className={styles.circle}>
              <FaMobileAlt className={styles.mobileAlt} />
            </div>
            <h4 className={cinzelDecorative.className}>Call Us</h4>
            <p>+385/91 512 6224</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactSection;
