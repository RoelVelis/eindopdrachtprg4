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
exports.MainMenu = void 0;
const ex = __importStar(require("excalibur"));
class MainMenu extends ex.Scene {
    constructor() {
        super();
    }
    onInitialize(engine) {
        const startButton = new ex.Label({
            text: 'Press K to Start Game',
            pos: ex.vec(engine.halfDrawWidth, engine.halfDrawHeight),
            font: new ex.Font({
                size: 40,
                unit: ex.FontUnit.Px,
                family: 'Arial',
                textAlign: ex.TextAlign.Center
            })
        });
        startButton.color = ex.Color.Azure.clone();
        this.add(startButton);
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === ex.Input.Keys.K) {
                engine.goToScene('game');
            }
        });
    }
}
exports.MainMenu = MainMenu;
//# sourceMappingURL=mainmenu.js.map