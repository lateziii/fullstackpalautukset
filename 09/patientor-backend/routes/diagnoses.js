"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send('Fetching all patients!');
});
router.post('/', function (_req, res) {
    res.send('Saving a patient!');
});
exports.default = router;
