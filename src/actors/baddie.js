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
exports.Baddie = void 0;
const ex = __importStar(require("excalibur"));
const resources_1 = require("../resources");
const config_1 = __importDefault(require("../config"));
const bullet_1 = require("./bullet");
const animation_manager_1 = require("./animation-manager");
const stats_1 = require("../stats");
class Baddie extends ex.Actor {
    constructor(x, y, width, height) {
        super({
            pos: new ex.Vector(x, y),
            width: width,
            height: height,
        });
        this.fireAngle = Math.random() * Math.PI * 2;
        // Passive recieves collision events but does not participate in resolution
        this.body.collisionType = ex.CollisionType.Passive;
        // Enemy groups does not collide with itself
        this.body.group = Baddie.group;
        // Setup listeners
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }
    // OnInitialize is called before the 1st actor update
    onInitialize(engine) {
        // Initialize actor
        // Setup visuals
        this.anim = ex.Animation.fromSpriteSheet(resources_1.gameSheet, [9, 10, 11], 100, ex.AnimationStrategy.Loop);
        this.anim.scale = new ex.Vector(4, 4);
        this.graphics.use(this.anim);
        this.explode = ex.Animation.fromSpriteSheet(resources_1.explosionSpriteSheet, ex.range(0, resources_1.explosionSpriteSheet.sprites.length - 1), 40, ex.AnimationStrategy.End);
        this.explode.scale = new ex.Vector(3, 3);
        // Setup patrolling behavior
        this.actions.repeatForever(ctx => ctx.moveTo(this.pos.x, this.pos.y + 800, config_1.default.enemySpeed)
            .moveTo(this.pos.x + 800, this.pos.y, config_1.default.enemySpeed)
            .moveTo(this.pos.x + 800, this.pos.y + 800, config_1.default.enemySpeed)
            .moveTo(this.pos.x, this.pos.y, config_1.default.enemySpeed));
        // Setup firing timer, repeats forever
        this.fireTimer = new ex.Timer({
            fcn: () => { this.fire(engine); },
            interval: config_1.default.enemyFireInterval,
            repeats: true,
            numberOfRepeats: -1
        });
        engine.addTimer(this.fireTimer);
        this.fireTimer.start();
    }
    // Fires before excalibur collision resoulation
    onPreCollision(evt) {
        // only kill a baddie if it collides with something that isn't a baddie or a baddie bullet
        if (!(evt.other instanceof Baddie) &&
            !ex.Util.contains(Baddie.Bullets, evt.other)) {
            if (this.explode) {
                animation_manager_1.animManager.play(this.explode, this.pos);
            }
            stats_1.stats.score += 100;
            if (this.fireTimer) {
                this.fireTimer.cancel();
            }
            this.kill();
        }
    }
    fire(engine) {
        this.fireAngle += Math.PI / 20;
        const bulletVelocity = new ex.Vector(config_1.default.enemyBulletVelocity * Math.cos(this.fireAngle), config_1.default.enemyBulletVelocity * Math.sin(this.fireAngle));
        const bullet = new bullet_1.Bullet(this.pos.x, this.pos.y, bulletVelocity.x, bulletVelocity.y, Baddie.group);
        Baddie.Bullets.push(bullet);
        engine.add(bullet);
    }
}
exports.Baddie = Baddie;
Baddie.group = ex.CollisionGroupManager.create('enemy');
// All bullets belonging to baddies
Baddie.Bullets = [];
//# sourceMappingURL=baddie.js.map