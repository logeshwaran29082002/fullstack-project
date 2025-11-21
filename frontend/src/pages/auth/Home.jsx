import React from "react";
import styles from "../../styles/pages/Home.module.css";

function Home() {
  return (
    <div className={styles.outer}>

      <div className={styles.frame}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome Home 🚀</h1>
          <p className={styles.subtitle}>
            Your smart dashboard begins here.
          </p>
          <button className={styles.heroBtn}>Get Started</button>
        </section>

        <section className={styles.features}>
          <div className={styles.card}>
            <h3>⚡ Fast</h3>
            <p>Quick access with smooth performance.</p>
          </div>
          <div className={styles.card}>
            <h3>🔒 Secure</h3>
            <p>Your data is encrypted and protected.</p>
          </div>
          <div className={styles.card}>
            <h3>🎨 Beautiful</h3>
            <p>Modern, minimal and aesthetic UI.</p>
          </div>
        </section>
      </div>

    </div>
  );
}

export default Home;
