import React from "react";
import { useState } from "react";
import { useGallery } from "../../context/galleryContext";
import styles from "./GalleryHeader.module.css";

function GalleryHeader() {
  // Consume context via custom hook
  const { handleDeleteGalleryImages, galleryItems, handleHydrateGallery } =
    useGallery();

  const selectedItemArr = () => {
    return galleryItems.filter((item) => item.isSelected === true).length;
  };
  const selectedItemCount = selectedItemArr();

  // dynamiclly rendered jsx content
  return (
    <div className={styles.galleryHeader}>
      {selectedItemCount <= 0 ? (
        <h2 className={styles.galleryHeaderTitle}>Gallery</h2>
      ) : (
        <div className={styles.galleryHeaderContent}>
          <div className="galleryHeaderLeft">
            <div className={styles.galleryLeftWrapper}>
              <input
                className={styles.headerCheckbox}
                defaultChecked
                onChange={() => {
                  // Turn all selected item into unselect and update gallery state.
                  const newGalleryItems = galleryItems.map((item) => {
                    if (item.isSelected === true) {
                      return { ...item, isSelected: false };
                    } else {
                      return item;
                    }
                  });
                  // Update state
                  handleHydrateGallery(newGalleryItems);
                }}
                type="checkbox"
                name=""
                id=""
              />
              <p>
                {selectedItemCount === 1
                  ? `${selectedItemCount} File Selected`
                  : `${selectedItemCount} Files Selected`}
              </p>
            </div>
          </div>
          <div className="galleryHeaderRight">
            <a
              onClick={() => {
                handleDeleteGalleryImages();
              }}
              className={styles.deleteText}
              href="#"
            >
              Delete files
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryHeader;
