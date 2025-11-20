import React from 'react'
import styles from '../../styles/pages/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      
      <section className={styles.hero}>
        <h1 className={styles.homeTitle}>Welcome Home 🏠</h1>
        <p className={styles.subtitle}>Your personal dashboard starts here.</p>
        <button className={styles.heroBtn}>Get Started</button>
      </section>

      <section className={styles.features}>
        <div className={styles.card}>
          <h3>⚡ Fast</h3>
          <p>Quick access to all features with smooth navigation.</p>
        </div>
        <div className={styles.card}>
          <h3>🔒 Secure</h3>
          <p>Your data stays protected with encrypted storage.</p>
        </div>
        <div className={styles.card}>
          <h3>🎨 Beautiful</h3>
          <p>A clean and modern UI designed for simplicity.</p>
        </div>
      </section>

    </div>
  )
}

export default Home
