import * as express from 'express';
import * as fs from 'fs';

const app = express();

const cors = require('cors');
app.use(cors({
    origin: true,
}));

app.use(express.json());

app.get('/feedposts', (req: express.Request, res: express.Response) => {
    const list = require('./data/feedposts.json');
    let skip = parseInt(req.query.skip?.toString() || '0');
    res.send({
        success: true,
        data: {
            pagination: {
                skip,
                limit: req.query.limit || 5,
            },
            feedposts: list.slice(skip, skip + 5),
        }
    });
});

app.post('/bookmark', (req, res) => {
    const list = require('./data/feedposts.json');
    if (req.body.type === 'FEEDPOST_LIKE') {
        for (let i = 0; i < list.length; i++) {
            if (list[i].feedpostId === req.body.feedpostId) {
                list[i].personal.liked = !list[i].personal.liked;
            }
        }
    }
    fs.writeFileSync('./data/feedposts.json', JSON.stringify(list, null, 4));
    res.send({
        success: false,
    });
});

app.get('/comments', (req, res) => {
    res.send({
        success: true,
        data: {}
    });
});

app.listen(3000, () => {
    console.log('server is listening');
});
