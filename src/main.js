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
const ex = __importStar(require("excalibur"));
const resources_1 = require("./resources"); // Assuming you have a resource loader
const mainmenu_1 = require("./mainmenu");
const game_1 = require("./game");
function waitForFontLoad(font_1) {
    return __awaiter(this, arguments, void 0, function* (font, timeout = 2000, interval = 100) {
        return new Promise((resolve, reject) => {
            const poller = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield document.fonts.load(font);
                }
                catch (err) {
                    reject(err);
                }
                if (document.fonts.check(font)) {
                    clearInterval(poller);
                    resolve(true);
                }
            }), interval);
            setTimeout(() => clearInterval(poller), timeout);
        });
    });
}
const engine = new ex.Engine({
    backgroundColor: ex.Color.Black,
    pixelRatio: 2,
    width: 1000,
    height: 800,
    displayMode: ex.DisplayMode.FitScreen
});
engine.debug.entity.showName = true;
engine.backgroundColor = ex.Color.Black;
engine.setAntialiasing(false);
// Setup game scenes
engine.add('mainmenu', new mainmenu_1.MainMenu());
engine.add('game', new game_1.Game());
engine.goToScene('mainmenu');
// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
engine.on('visible', () => {
    console.log('start');
    engine.start();
});
engine.input.keyboard.on('press', (evt) => {
    if (evt.key === ex.Input.Keys.P) {
        engine.toggleDebug();
    }
});
waitForFontLoad("normal 30px Open Sans").then(() => {
    engine.start(resources_1.loader).then(() => {
        console.log("Game Resources Loaded");
    });
});
//# sourceMappingURL=main.js.map