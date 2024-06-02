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
exports.Ship = void 0;
const ex = __importStar(require("excalibur"));
const resources_1 = require("../resources");
const config_1 = __importDefault(require("../config"));
const bullet_1 = require("./bullet");
const baddie_1 = require("./baddie");
const animation_manager_1 = require("./animation-manager");
const stats_1 = require("../stats");
const throttle = function (func, throttle) {
    var lastTime = Date.now();
    var throttle = throttle;
    return (engine) => {
        var currentTime = Date.now();
        if (currentTime - lastTime > throttle) {
            var val = func.apply(this, [engine]);
            lastTime = currentTime;
            return val;
        }
    };
};
class Ship extends ex.Actor {
    constructor(x, y, width, height, controls) {
        super({
            pos: new ex.Vector(x, y),
            width: width,
            height: height,
        });
        this.flipBarrel = false;
        this.stopRegisteringFireThrottleEvent = () => {
            this.throttleFire = undefined;
        };
        this.fire = (engine) => {
            let bullet = new bullet_1.Bullet(this.pos.x + (this.flipBarrel ? -40 : 40), this.pos.y - 20, 0, config_1.default.playerBulletVelocity, Ship.group);
            this.flipBarrel = !this.flipBarrel;
            engine.add(bullet);
        };
        this.handleKeyEvent = (engine, evt) => {
            let dir = ex.Vector.Zero.clone();
            if (evt.key === this.controls.fire) {
                this.throttleFire ? this.throttleFire(engine) : null;
                if (this.vel.x !== 0 || this.vel.y !== 0) {
                    dir = this.vel.normalize();
                }
            }
            if (evt.key === this.controls.up) {
                dir.y += -1;
            }
            if (evt.key === this.controls.left) {
                dir.x += -1;
            }
            if (evt.key === this.controls.right) {
                dir.x += 1;
            }
            if (evt.key === this.controls.down) {
                dir.y += 1;
            }
            if (dir.x !== 0 || dir.y !== 0) {
                this.vel = dir.normalize().scale(config_1.default.playerSpeed);
            }
        };
        this.controls = controls;
        this.body.collisionType = ex.CollisionType.Passive;
        this.body.group = Ship.group;
    }
    onInitialize(engine) {
        this.throttleFire = throttle(this.fire, config_1.default.playerFireThrottle);
        this.on('precollision', (evt) => this.onPreCollision(evt));
        // Keyboard
        engine.input.keyboard.on('hold', (evt) => this.handleKeyEvent(engine, evt));
        engine.input.keyboard.on('release', (evt) => {
            if (evt.key !== this.controls.fire) {
                this.vel = ex.Vector.Zero.clone();
            }
        });
        // Get animation
        const anim = ex.Animation.fromSpriteSheet(resources_1.gameSheet, [0, 1, 2], 100, ex.AnimationStrategy.Loop);
        anim.scale = new ex.Vector(4, 4);
        this.graphics.use(anim);
        this.explode = ex.Animation.fromSpriteSheet(resources_1.explosionSpriteSheet, ex.range(0, resources_1.explosionSpriteSheet.sprites.length - 1), 40, ex.AnimationStrategy.End);
        this.explode.scale = new ex.Vector(3, 3);
    }
    onPreCollision(evt) {
        if (evt.other instanceof baddie_1.Baddie || ex.Util.contains(baddie_1.Baddie.Bullets, evt.other)) {
            this.actions.blink(300, 300, 3);
            stats_1.stats.hp -= config_1.default.enemyDamage;
            if (stats_1.stats.hp <= 0) {
                stats_1.stats.gameOver = true;
                this.kill();
                this.stopRegisteringFireThrottleEvent();
            }
        }
    }
    onPostUpdate(engine, delta) {
        if (stats_1.stats.hp <= 0 && this.explode) {
            animation_manager_1.animManager.play(this.explode, this.pos);
            this.kill();
        }
        // Keep player in the viewport
        if (this.pos.x < 0)
            this.pos.x = 0;
        if (this.pos.y < 0)
            this.pos.y = 0;
        if (this.pos.x > engine.drawWidth - this.width)
            this.pos.x = (engine.drawWidth - this.width);
        if (this.pos.y > engine.drawHeight - this.height)
            this.pos.y = (engine.drawHeight - this.height);
    }
}
exports.Ship = Ship;
Ship.group = ex.CollisionGroupManager.create('player');
//# sourceMappingURL=ship.js.map