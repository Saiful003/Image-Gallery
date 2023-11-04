// Here you store our all actions with an object.
// No need to type actions everytime when use. Just import this actions object and use it.
const ACTIONS = {
  HYDRATE_GALLERY: "hydrateGallery",
  SELECTED_OR_UNSELECT_IMAGES: "selectOrUnselectImages",
  DELETE_SELECTED_IMAGES: "deleteSelectedImages",
};

// Set initial state here
const initialState = {
  galleryItems: [],
};

// Here is our Reducer function.
// Here we write down all business logic for manipulate our local state.
const galleryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECTED_OR_UNSELECT_IMAGES: {
      // TODO:
      // Grab image id from payload of this action.
      // With the help this id, find out targeted element using array loop method.
      // Finally, update state with new data.
      return {
        ...state,
        galleryItems: state.galleryItems.map((galleryItem) => {
          if (galleryItem.id === action.payload) {
            return { ...galleryItem, isSelected: !galleryItem.isSelected };
          }
          return galleryItem;
        }),
      };
    }
    case ACTIONS.HYDRATE_GALLERY: {
      // TODO:
      // Update our local state with full list of images.
      return { ...state, galleryItems: action.payload };
    }
    case ACTIONS.DELETE_SELECTED_IMAGES: {
      return {
        ...state,
        galleryItems: state.galleryItems.filter(
          (item) => item.isSelected !== true
        ),
      };
    }
    default: {
      return state;
    }
  }
};

// Lastly export necessary things.
export { galleryReducer, initialState, ACTIONS };
