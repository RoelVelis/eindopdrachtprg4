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
exports.Bullet = void 0;
const ex = __importStar(require("excalibur"));
const config_1 = __importDefault(require("../config"));
const resources_1 = require("../resources");
const baddie_1 = require("./baddie");
class Bullet extends ex.Actor {
    constructor(x, y, dx, dy, collisiongGroup) {
        super({
            pos: new ex.Vector(x, y),
            vel: new ex.Vector(dx, dy),
            width: config_1.default.bulletSize,
            height: config_1.default.bulletSize,
        });
        this.body.collisionType = ex.CollisionType.Passive;
        this.body.group = collisiongGroup;
    }
    onInitialize(engine) {
        this.on('precollision', (evt) => this.onPreCollision(evt));
        // Clean up on exit viewport
        this.on('exitviewport', () => this.killAndRemoveFromBullets());
        const anim = ex.Animation.fromSpriteSheet(resources_1.gameSheet, [3, 4, 5, 6, 7, 8, 7, 6, 5, 4], 100, ex.AnimationStrategy.Loop);
        anim.scale = new ex.Vector(2, 2);
        this.graphics.use(anim);
    }
    onPreCollision(evt) {
        if (!(evt.other instanceof Bullet)) {
            this.killAndRemoveFromBullets();
        }
    }
    killAndRemoveFromBullets() {
        this.kill();
        ex.Util.removeItemFromArray(this, baddie_1.Baddie.Bullets);
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=bullet.js.map