"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(diagnoseService_1.default.getEntries());
});
router.post('/', function (_req, res) {
    res.send('Saving a patient!');
});
exports.default = router;
