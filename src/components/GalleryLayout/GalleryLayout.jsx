import React from "react";
import styles from "./GalleryLayout.module.css";

function GalleryLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.galleryWrapper}>{children}</div>
    </div>
  );
}

export default GalleryLayout;
