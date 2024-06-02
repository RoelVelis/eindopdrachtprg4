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
exports.animManager = exports.AnimationManager = void 0;
const ex = __importStar(require("excalibur"));
class AnimationManager extends ex.Actor {
    constructor() {
        super({
            pos: ex.Vector.Zero,
            width: 0,
            height: 0,
            collisionType: ex.CollisionType.PreventCollision,
        });
        this.animations = [];
        this.graphics.onPostDraw = (ctx) => this.drawAnimations(ctx);
    }
    play(animation, pos) {
        this.animations.push({
            anim: animation.clone(),
            pos: pos.clone()
        });
    }
    onPostUpdate(engine, elapsed) {
        this.animations.forEach(a => a.anim.tick(elapsed, engine.stats.currFrame.id));
        this.animations = this.animations.filter(a => !a.anim.done);
    }
    drawAnimations(ctx /*, delta: number */) {
        for (let node of this.animations) {
            node.anim.draw(ctx, node.pos.x - node.anim.width / 2, node.pos.y - node.anim.height / 2);
        }
    }
}
exports.AnimationManager = AnimationManager;
const animManager = new AnimationManager();
exports.animManager = animManager;
//# sourceMappingURL=animation-manager.js.map