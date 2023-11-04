import React from "react";
import styles from "./AddImage.module.css";
import downloadImg from "../../assets/Images/download.webp";

function AddImage() {
  return (
    <div className={styles.addImageWrapper}>
      <div className={styles.addContentWrapper}>
        <img className={styles.downloadImg} src={downloadImg} alt="" />
        <p className={styles.addImage}>Add Images</p>
      </div>
    </div>
  );
}

export default AddImage;
