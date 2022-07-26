"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_controller_1 = require("../../controllers/main/main.controller");
const preSearch_controller_1 = require("../../controllers/main/preSearch.controller");
const router = express_1.default.Router();
router.get('/', main_controller_1.mainController);
router.get('/pre-search', preSearch_controller_1.preSearchController);
exports.default = router;
