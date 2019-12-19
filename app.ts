import express from 'express'
import fetch from 'node-fetch'
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:endpoint', (req, res) => {
    res.render(req.params.endpoint);
});

/*
posting endpoints:
   /team/${team_key}/events/${year} (/keys ||/statuses )
   /events/${year}
   /event/${event_key}/teams (/keys)
   /team/${team_key}/matches/${year}
   /event/${event_key} (/oprs ||/rankings ||/insights )
   /team/${team_key}/event/${event_key}/matches

   TODO: alias these with names we can use everywhere like d.ts, function names, etc.
*/

app.post('/endpoint', async (req, res) => {
    // TODO: add a thing for optional endpoint ending
    const { team_key, year, aep } = req.body;
    const response = await getTBA(`/team/${team_key}/events/${year}${aep}`);
    res.json(response);
});

const getTBA = async (endpoint: string) => {
    const response = await fetch(`https://www.thebluealliance.com/api/v3${endpoint}?X-TBA-Auth-Key=${process.env.TBAKEY}`);
    return await response.json();
};

app.listen(port, () => console.log(`Scouting app listening at http://localhost:${port}`));