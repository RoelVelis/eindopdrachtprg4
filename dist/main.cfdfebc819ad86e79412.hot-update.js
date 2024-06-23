"use strict";
self["webpackHotUpdate_excaliburjs_Eindprojectprg4"]("main",{

/***/ "./src/stats.ts":
/*!**********************!*\
  !*** ./src/stats.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stats = void 0;
const config_1 = __importDefault(__webpack_require__(/*! ./config */ "./src/config.ts"));
class Stats {
    constructor() {
        this.hp = config_1.default.totalHp;
        this.gameOver = false;
        this.score = 0;
    }
    reset() {
        this.hp = config_1.default.totalHp;
        this.gameOver = false;
        this.score = 0;
    }
}
const stats = new Stats();
exports.stats = stats;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6cfd56f3c3161e980a2d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.cfdfebc819ad86e79412.hot-update.js.map