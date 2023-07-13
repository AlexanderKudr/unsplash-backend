import { uploadToProfile } from "./uploadToProfile";
import { updateFavoriteImages } from "./updateFavoriteImages";
import { imagesForUser } from "./imagesForUser";
import { imagesForNonUser } from "./imagesForNonUser";
import { getCategoriesFromCDN } from "./getCategories";
import { getFavoriteImages } from "./getFavoriteImages";
import {getProfileImages} from "./getProfileImages";
// import { getFavoriteImages } from "./getFavoriteImages";

export const imagesControllers = {
  uploadToProfile,
  updateFavoriteImages,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
  getFavoriteImages,
  getProfileImages
};
