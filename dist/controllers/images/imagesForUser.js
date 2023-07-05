"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesForUser = void 0;
const cloudinary_1 = require("cloudinary");
const lib_1 = require("../../lib");
const services_1 = require("../../services");
const { prisma, handleDisconnectDB } = services_1.databaseService;
const imagesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, category, next_cursor } = req.body;
    try {
        const getImagesFromCDN = yield cloudinary_1.v2.search
            .expression(`folder:${category}`)
            .max_results(50)
            .next_cursor(next_cursor)
            .execute();
        const getFavoriteImagesFromDB = yield prisma.user.findUnique({
            where: { accessToken },
            select: { favoriteImages: true },
        });
        const images = getImagesFromCDN === null || getImagesFromCDN === void 0 ? void 0 : getImagesFromCDN.resources.map((image) => {
            const isFavorite = getFavoriteImagesFromDB === null || getFavoriteImagesFromDB === void 0 ? void 0 : getFavoriteImagesFromDB.favoriteImages.some(({ public_id }) => public_id === image.public_id);
            return isFavorite ? Object.assign(Object.assign({}, image), { favorite: true }) : Object.assign(Object.assign({}, image), { favorite: false });
        });
        res.send({ images: images, pagePreview: (0, lib_1.pagePreview)(category) });
    }
    catch (error) {
        res.status(500).send({ error: "Category images for user could not be fetched" });
    }
    finally {
        handleDisconnectDB();
    }
});
exports.imagesForUser = imagesForUser;
//# sourceMappingURL=imagesForUser.js.map