import { useEffect } from "react";
import GalleryBoard from "./components/GalleryBoard/GalleryBoard";
import GalleryHeader from "./components/GalleryHeader/GalleryHeader";
import GalleryLayout from "./components/GalleryLayout/GalleryLayout";
import { useGallery } from "./context/galleryContext";
import { galleryImages } from "./Data/galleryImages";

function App() {
  // Consume context via custom hook
  const { handleHydrateGallery } = useGallery();
  // After loaded dom for very first time, hydrate our gallery state with dummy items.
  useEffect(() => {
    handleHydrateGallery(galleryImages);
  }, []);

  // Dispatch functions for state update
  return (
    <div className="mainWrapper">
      <GalleryLayout>
        <GalleryHeader />
        <GalleryBoard />
      </GalleryLayout>
    </div>
  );
}

export default App;
