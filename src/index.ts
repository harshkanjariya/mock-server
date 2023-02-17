require('dotenv').config();
import * as express from 'express';
import * as fs from 'fs';
import * as _ from 'lodash';

const app = express();

const cors = require('cors');
app.use(cors({
    origin: true,
}));

app.use(express.json());

app.use(async (req, res, next) => {
    setTimeout(next, 1000);
});

app.get('/v1/users/self', (req, res) => {
    // res.send({
    //     success: false,
    //     data: {}
    // });
    res.send({
        success: true,
        data: {
            _id: 'abcdabcd',
        }
    });
});
app.get('/v3/reels/users/feedposts', (req: express.Request, res: express.Response) => {
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
app.get('/v3/reels/users/feedposts/:feedpostId', (req: express.Request, res: express.Response) => {
    const list = require('./data/feedposts.json');
    const obj = list.filter((o: any) => o.feedpostId === req.params.feedpostId);
    res.send({
        success: true,
        data: obj[0]
    });
});
app.get('/v3/reels/users/unauth-feedposts', (req: express.Request, res: express.Response) => {
    const list = require('./data/feedposts.json');
    const shortList = [...Array(5)].map((o: any, i: number) => ({...list[i]}));

    res.send({
        success: true,
        data: shortList,
    });
});
app.get('/v3/reels/users/saved-feed-posts', (req: express.Request, res: express.Response) => {
    const list = require('./data/feedposts.json');
    const savedList = list.filter((o: any) => o.personal.saved);
    let skip = parseInt(req.query.skip?.toString() || '0');
    let limit = parseInt(req.query.limit?.toString() || '5');
    res.send({
        success: true,
        data: {
            pagination: {
                skip,
                limit,
            },
            feedposts: savedList.slice(skip, skip + limit),
        }
    });
});
app.get('/v3/reels/users/creators/:creatorId', (req, res) => {
    let reels = require('./data/feedposts.json');
    reels = reels.map((o:any)=>_.pick(o, 'feedpostId', 'description', 'views', 'thumbnail'));

    res.send({
        success: true,
        data: {
            pagination: {
                totalCount: reels.length,
            },
            feedposts: reels,
            firstName: 'john',
            lastName: 'doe',
            totalViews: reels.map((o: any)=>o.views).reduce((a:number,b:number)=>a+b),
            totalFeedposts: reels.length,
            totalLikes: reels.map((o: any)=>o.views).reduce((a:number,b:number)=>a+b),
            avatar: 'http://picsum.photos/500',
            feedpostSubject: 'Javascript',
            feedpostBiodata: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque tempor fermentum. Nunc ut blandit augue. Curabitur enim odio, maximus id mauris pretium, bibendum vehicula erat. Duis lorem elit, aliquam et sem eu, vestibulum sollicitudin metus. Sed id sapien non turpis pharetra faucibus. Duis faucibus justo purus, at malesuada dolor varius sed. Phasellus ex elit, sagittis at leo quis, auctor porttitor quam. Curabitur consectetur tellus leo, sit amet porta leo aliquet in. Phasellus suscipit consectetur arcu sit amet pellentesque. Donec faucibus auctor elit sit amet gravida. Pellentesque nec tellus magna. Nam ornare viverra turpis at gravida.
            Nulla vestibulum auctor tincidunt. Donec efficitur nisl vitae magna mattis, eu ultricies quam auctor. Pellentesque tempus sollicitudin lacus, et tincidunt dui varius ut. Phasellus placerat tincidunt sem in elementum. Sed fringilla urna ut urna tincidunt, vitae placerat nisi ultricies. Sed mattis placerat luctus. Cras sed laoreet orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean facilisis non urna quis fermentum. Integer consequat suscipit interdum.`,
        }
    });
});
app.post('/v3/reels/users/bookmark', (req, res) => {
    const list = require('./data/feedposts.json');
    for (let i = 0; i < list.length; i++) {
        if (list[i].feedpostId === req.body.feedpostId) {
            if (req.body.kind === 'LIKE') {
                list[i].personal.liked = true;
                list[i].likes = list[i].likes + 1;
            } else if (req.body.kind === 'DISLIKE') {
                list[i].personal.liked = false;
                list[i].likes = list[i].likes - 1;
            } else if (req.body.kind === 'SAVE') {
                list[i].personal.saved = true;
            } else if (req.body.kind === 'UNSAVE') {
                list[i].personal.saved = false;
            }
        }
    }
    fs.writeFileSync(__dirname + '/data/feedposts.json', JSON.stringify(list, null, 4));
    res.send({
        success: true,
    });
});
app.get('/v3/reels/users/comments', (req, res) => {
    const list = require('./data/comments.json');
    const filteredList = list.filter((o: any) => o.typeId === req.query.feedpostId);
    console.log('index.ts > 126', filteredList);
    let skip = parseInt(req.query.skip?.toString() || '0');
    let limit = parseInt(req.query.limit?.toString() || '0');
    res.send({
        success: true,
        data: {
            pagination: {
                skip,
                limit,
            },
            list: filteredList.slice(skip, skip + limit),
        }
    });
});

const { exec } = require('child_process');

exec('ifconfig | grep 192.168.', (err: any, stdout: any, stderr: any) => {
    let s = stdout.toString();
    s = s.substring(s.indexOf('192.168'));
    let ip = s.substring(0, s.indexOf(' '));

    app.listen(process.env.PORT || 3000, () => {
        console.log('server is listening on '+ ip + ':' + (process.env.PORT || 3000));
    });
});
