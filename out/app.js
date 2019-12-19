"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = express_1.default();
require('dotenv').config();
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/:endpoint', (req, res) => {
    res.render(req.params.endpoint);
});
app.post('/endpoint', async (req, res) => {
    const { team_key, year, aep } = req.body;
    const response = await getTBA(`/team/${team_key}/events/${year}${aep}`);
    res.json(response);
});
const getTBA = async (endpoint) => {
    const response = await node_fetch_1.default(`https://www.thebluealliance.com/api/v3${endpoint}?X-TBA-Auth-Key=${process.env.TBAKEY}`);
    return await response.json();
};
app.listen(port, () => console.log(`Scouting app listening at http://localhost:${port}`));
//# sourceMappingURL=app.js.map