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
exports.HealthBar = void 0;
const ex = __importStar(require("excalibur"));
const excalibur_1 = require("excalibur");
const config_1 = __importDefault(require("../config"));
const stats_1 = require("../stats");
class HealthBar extends ex.Actor {
    constructor() {
        super({
            name: "healthbar",
            color: ex.Color.Green,
            pos: new ex.Vector(20, 20),
        });
        this.healthBarWidth = config_1.default.healthBarWidth;
        this.healthBarHeight = config_1.default.healthBarHeight;
        this.transform.coordPlane = ex.CoordPlane.Screen;
        this.body.collisionType = ex.CollisionType.PreventCollision;
        this.graphics.anchor = excalibur_1.Vector.Zero;
        this.graphics.use(new ex.Canvas({
            draw: (ctx) => this.draw(ctx),
            cache: false,
            width: config_1.default.healthBarWidth + 20,
            height: config_1.default.healthBarHeight + 50
        }));
    }
    onPreUpdate() {
        this.healthBarWidth = config_1.default.healthBarWidth * (stats_1.stats.hp / config_1.default.totalHp);
    }
    draw(ctx) {
        ctx.strokeStyle = this.color.toString();
        ctx.fillStyle = this.color.toString();
        ctx.lineWidth = 3;
        ctx.font = 'normal 30px Open Sans';
        ctx.fillText("HP", 0, 30);
        ctx.strokeRect(0, 35, config_1.default.healthBarWidth + 10, config_1.default.healthBarHeight + 10);
        ctx.fillRect(5, 40, this.healthBarWidth, config_1.default.healthBarHeight);
    }
}
exports.HealthBar = HealthBar;
//# sourceMappingURL=health-bar.js.map