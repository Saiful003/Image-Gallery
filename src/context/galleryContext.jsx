import React, { useContext, useReducer } from "react";
import {
  ACTIONS,
  initialState,
  galleryReducer,
} from "../Reducer/galleryReducer";

// Create React Context
const GalleryContext = React.createContext();

// This is our custom hook to consume context data without importing everytime Gallery Context.
export function useGallery() {
  return useContext(GalleryContext);
}
// A provider function, which received a children props, children means whatever you passed via wrap this. In my case, here children is whole application.
export default function GalleryContextProvider({ children }) {
  const [{ galleryItems }, galleryDispatch] = useReducer(
    galleryReducer,
    initialState
  );

  // Dispatch for state update

  // This function used for updating our local empty array with some dummy items.
  const handleHydrateGallery = (allImages) => {
    galleryDispatch({
      type: ACTIONS.HYDRATE_GALLERY,
      payload: allImages,
    });
  };
  // This function used for select or unselect images.
  const handleSelectOrUnselect = (id) => {
    galleryDispatch({
      type: ACTIONS.SELECTED_OR_UNSELECT_IMAGES,
      payload: id,
    });
  };
  // This function used for delete selected images.
  const handleDeleteGalleryImages = () => {
    galleryDispatch({
      type: ACTIONS.DELETE_SELECTED_IMAGES,
    });
  };

  // Choose what you want to share
  const value = {
    galleryItems,
    handleHydrateGallery,
    handleSelectOrUnselect,
    handleDeleteGalleryImages,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
