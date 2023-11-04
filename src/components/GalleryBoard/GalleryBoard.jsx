import React from "react";
import styles from "./GalleryBoard.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";
import { useGallery } from "../../context/galleryContext";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import AddImage from "../AddImage/AddImage";

function GalleryBoard() {
  // Consume context via custom hook
  const { galleryItems, handleHydrateGallery } = useGallery();
  // Track what images id is activated
  const [activeId, setActiveId] = useState(null);
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  return (
    <div className={styles.galleryBoard}>
      <div className={styles.galleryGrid}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext strategy={rectSortingStrategy} items={galleryItems}>
            {galleryItems.length > 0 ? (
              galleryItems.map((item, index) => (
                <GalleryItem
                  {...item}
                  key={item.id}
                  index={index}
                  uniqueId={item.id}
                />
              ))
            ) : (
              <h2>Opps!. No more image gallery item!</h2>
            )}
          </SortableContext>

          {/* Draggable Overlay */}
          <DragOverlay adjustScale>
            {activeId ? (
              <GalleryItem
                index={galleryItems.findIndex((item) => item.id === activeId)}
                imageUrl={
                  galleryItems.find((item) => item.id === activeId).imageUrl
                }
                isSelected={
                  galleryItems.find((item) => item.id === activeId).isSelected
                }
                isDraggable={true}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
        {/* Add Image Button */}
        <AddImage />
      </div>
    </div>
  );

  // Dnd kit control functions
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = galleryItems.findIndex((item) => item.id === active.id);
      const newIndex = galleryItems.findIndex((item) => item.id === over.id);
      const newPositionGalleryItem = arrayMove(
        galleryItems,
        oldIndex,
        newIndex
      );

      // Hydrate our local state
      handleHydrateGallery(newPositionGalleryItem);
    }

    // Remove active id
    setActiveId(null);
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragCancel() {
    setActiveId(null);
  }
}

export default GalleryBoard;
