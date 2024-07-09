import styles from "@/styles/Settings.module.scss";
import { getSettings } from "@/Utils/settings";

const Disclaimer = () => {
  let mode = "dark"; // Default mode
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("RiveStreamSettings");
    mode = local ? JSON.parse(local).mode : "dark";
  }
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        {mode === "dark" ? (
          <img
            src="/images/logoSq.png"
            alt="logo"
            data-tooltip-id="tooltip"
            data-tooltip-content="Rive"
          />
        ) : (
          <img
            src="/images/logoSq-white.png"
            alt="logo"
            data-tooltip-id="tooltip"
            data-tooltip-content="Rive"
          />
        )}
      </div>
      <div className={styles.settings}>
        <h1>Disclaimer</h1>
        <div className={styles.group2}>
          <p>
            Rive does not host any files, it merely links to 3rd party services.
          </p>
          <p>
            Legal issues should be taken up with the file hosts and providers.
          </p>
          <p>
            Rive is not responsible for any media files shown by the video
            providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
