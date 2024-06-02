"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSheet = exports.explosionSpriteSheet = exports.loader = exports.Images = void 0;
const ex = __importStar(require("excalibur"));
const fighter_png_1 = __importDefault(require("../res/fighter.png"));
const enemy_png_1 = __importDefault(require("../res/enemy.png"));
const spriteexplosion_png_1 = __importDefault(require("../res/spriteexplosion.png"));
const gameSheet_png_1 = __importDefault(require("../res/gameSheet.png"));
const Images = {
    fighter: new ex.ImageSource(fighter_png_1.default),
    enemyPink: new ex.ImageSource(enemy_png_1.default),
    explosion: new ex.ImageSource(spriteexplosion_png_1.default),
    sheet: new ex.ImageSource(gameSheet_png_1.default),
};
exports.Images = Images;
const explosionSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.explosion,
    grid: {
        rows: 5,
        columns: 5,
        spriteWidth: 45,
        spriteHeight: 45
    }
});
exports.explosionSpriteSheet = explosionSpriteSheet;
const gameSheet = ex.SpriteSheet.fromImageSource({
    image: Images.sheet,
    grid: {
        rows: 10,
        columns: 10,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
exports.gameSheet = gameSheet;
const loader = new ex.Loader();
exports.loader = loader;
const allResources = Object.assign({}, Images);
for (const res in allResources) {
    loader.addResource(allResources[res]);
}
//# sourceMappingURL=resources.js.map