import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
      <div className={styles.socialIcons}>
        <img
          src="/icons/facebook.png"
          alt="Facebook"
          className={styles.icon}
        />
        <img
          src="/icons/instagram.png"
          alt="Instagram"
          className={styles.icon}
        />
        <img
          src="/icons/twitter.png"
          alt="Twitter"
          className={styles.icon}
        />
        <img
          src="/icons/twitch.png"
          alt="Twitch"
          className={styles.icon}
        />
        <img
          src="/icons/youtube.png"
          alt="YouTube"
          className={styles.icon}
        />
      </div>

      <div className={styles.footerLinks}>
        <div className={styles.linkGroup}>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Corporate Information</a>
        </div>
        <div className={styles.linkGroup}>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Corporate Information</a>
        </div>
      </div>

      <div className={styles.brand}>
        <p>© Alkye Test</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
