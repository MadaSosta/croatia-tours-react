import Image from "next/image";
import Link from "next/link";
import styles from "./LandscapeSection.module.css";
import { cinzelDecorative } from "@/constants/consts";

function LandscapeSection() {
  return (
    <section className={styles.landscapes} id="landscapes">
      <article className={styles.landscapesWrapper}>
        <p className={styles.customHeading}>landscapes</p>
        <h1 className={cinzelDecorative.className}>Beautiful Landscapes</h1>
        <p className={styles.customText}>
          The beauty of Croatia can hardly be overestimated. It has literally
          everything: mountains, green forests, beaches. Come and see with your
          own eyes.
        </p>
        <div className={styles.imageWrapper}>
          <Link href={`/trip/${1}`}>
            <p>Krka Waterfalls</p>
            <Image
              src="/images/krka.jpg"
              alt="Krka Waterfalls"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
          <Link href={`/trip/${2}`}>
            <p>Stuning Islands</p>
            <Image
              src="/images/otok.jpg"
              alt="Island"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
          <Link href={`/trip/${3}`}>
            <p>Velebit</p>
            <Image
              src="/images/priroda.jpg"
              alt="Velebit"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
          <Link href={`/trip/${4}`}>
            <p>Dalmatian caves</p>
            <Image
              src="/images/priroda2.jpg"
              alt="Cave"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
          <Link href={`/trip/${5}`}>
            <p>Rovinj</p>
            <Image
              src="/images/rovinj.jpg"
              alt="Rovinj"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
          <Link href={`/trip/${6}`}>
            <p>Plitvice lakes</p>
            <Image
              src="/images/slap.jpg"
              alt="Plitvice lakes"
              fill
              sizes="(max-width: 768px) 300px, 400px"
            />
          </Link>
        </div>
      </article>
    </section>
  );
}

export default LandscapeSection;
