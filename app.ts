import express from 'express'
import fetch from 'node-fetch'
const app = express();
require('dotenv').config();

app.use(express.urlencoded());
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/endpoint', (req, res) => {
    res.render('endpoint');
});

app.post('/endpoint', async (req, res) => {
    const {team_key, year} = req.body;
    const response = await getTBA(`/team/${team_key}/matches/${year}`);
    res.json(response);
});

const getTBA = async (endpoint: string) => {
    const response = await fetch(`https://www.thebluealliance.com/api/v3${endpoint}?X-TBA-Auth-Key=${process.env.TBAKEY}`);
    return await response.json();
};

app.listen(port, () => console.log(`Scouting app listening at http://localhost:${port}`));