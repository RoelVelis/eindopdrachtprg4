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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Missile = void 0;
const ex = __importStar(require("excalibur"));
const resources_1 = require("../resources");
const bullet_1 = require("./bullet");
class Missile extends ex.Actor {
    constructor() {
        super({
            pos: ex.Vector.Zero,
            width: 60,
            height: 20
        });
        this.on('precollision', this.onPreCollision);
        this.on('exitviewport', () => {
            this.kill();
        });
    }
    onInitialize(engine) {
        const anim = ex.Animation.fromSpriteSheet(resources_1.gameSheet, [13, 14, 15], 50, ex.AnimationStrategy.Loop);
        anim.scale = new ex.Vector(3, 3);
    }
    onPreCollision(evt) {
        if (!(evt.other instanceof bullet_1.Bullet)) {
            this.kill();
        }
    }
}
exports.Missile = Missile;
//# sourceMappingURL=missile.js.map