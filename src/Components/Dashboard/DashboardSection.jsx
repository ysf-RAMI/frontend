import React from "react";
import styles from "./Dashboard.module.css";

const DashboardSection = ({ icon, title, description }) => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.iconContainer}>
        <i className={`${styles.icon} ${icon}`} />
      </div>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDescription}>
          {description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split("\n").length - 1 && (
                <br className={styles.lineBreak} />
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default DashboardSection;
