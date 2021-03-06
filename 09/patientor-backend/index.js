"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var diagnoses_1 = __importDefault(require("./routes/diagnoses"));
var patients_1 = __importDefault(require("./routes/patients"));
var app = express_1.default();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
app.get("/api/ping", function (_req, res) {
    res.send("pong");
});
app.use('/api/diagnosis', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
var PORT = 3001;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
