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
exports.getFavoriteImages = void 0;
const utils_1 = require("../../utils");
const cloudinary_1 = require("cloudinary");
const { prisma } = utils_1.databaseUtils;
const getFavoriteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = prisma;
    const { name } = req.body;
    try {
        if (!name) {
            res.status(400).send({ message: "name is missing" });
            return;
        }
        const checkUser = yield user.findUnique({
            where: { name: name },
        });
        if (!checkUser) {
            res.status(400).send({ message: "User not found" });
            return;
        }
        const images = yield user.findMany({
            where: { name: name },
            select: { favoriteImages: true },
        });
        const publicIds = images[0].favoriteImages.map((image) => image.public_id);
        const imagesFromCDN = yield cloudinary_1.v2.api.resources_by_ids(publicIds);
        res.send({
            images: imagesFromCDN.resources,
            message: "Favorite images retrieved successfully",
        });
    }
    catch (_a) {
        res.status(500).send({ message: "Could not retrieve favorite images" });
    }
});
exports.getFavoriteImages = getFavoriteImages;
//# sourceMappingURL=getFavoriteImages.js.map