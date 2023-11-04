import styles from "./GalleryItem.module.css";
import { useGallery } from "../../context/galleryContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function GalleryItem(props) {
  const { imageUrl, index, id, uniqueId, isSelected, isDraggable } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: uniqueId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Consume context via custom hook
  const { handleSelectOrUnselect } = useGallery();

  const handleOnChange = () => {
    handleSelectOrUnselect(id);
  };

  // Inline style
  const inlineStyles = {
    transformOrigin: "0 0",
    border: "1px solid #b8b5b5",
    borderRadius: "10px",
    ...style,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      style={inlineStyles}
      ref={setNodeRef}
      className={styles.galleryItem}
    >
      {/* Overlay Div */}
      <div
        className={`${!isDraggable && styles.overlayWrapper} ${
          isSelected && styles.selected
        }`}
      ></div>
      {/* Overlay Div */}
      <img className="galleryImage" src={imageUrl} alt="" />
      <div
        className={`${styles.imageCheckboxInput} ${
          isSelected && styles.selected
        }`}
      >
        <input
          onChange={handleOnChange}
          className={styles.imageCheckbox}
          checked={isSelected}
          type="checkbox"
          name=""
          id=""
        />
      </div>
    </div>
  );
}
export default GalleryItem;
