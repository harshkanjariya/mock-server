import {random} from "lodash";

require('dotenv').config();
import express from 'express';
import * as fs from 'fs';
import * as _ from 'lodash';
import moment from 'moment';

const app = express();

const cors = require('cors');
app.use(cors({
  origin: true,
}));

app.use(express.json());

app.use(async (req: any, res: any, next: any) => {
  // setTimeout(next, 1000);
  next();
});

app.get('/v1/users/self', (req: any, res: any) => {
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
  const savedList: any[] = list.filter((o: any) => o.personal.saved);
  let skip = parseInt(req.query.skip?.toString() || '0');
  let limit = parseInt(req.query.limit?.toString() || '5');
  res.send({
    success: true,
    data: {
      pagination: {
        skip,
        limit,
        totalCount: savedList.length,
      },
      feedposts: savedList.filter((o: any, index: number) => index >= skip && index < skip + limit),
    }
  });
});
app.get('/v3/reels/users/creators/:creatorId', (req, res) => {
  let reels = require('./data/feedposts.json');
  reels = reels.map((o: any) => _.pick(o, 'feedpostId', 'description', 'views', 'thumbnail'));
  let skip = parseInt(req.query.skip?.toString() || '0');
  let limit = parseInt(req.query.limit?.toString() || '15');

  res.send({
    success: true,
    data: {
      pagination: {
        skip,
        limit,
        totalCount: reels.length,
      },
      feedposts: reels.splice(skip, skip + limit),
      firstName: 'john',
      lastName: 'doe',
      totalViews: reels.map((o: any) => o.views).reduce((a: number, b: number) => a + b),
      totalFeedposts: reels.length,
      totalLikes: reels.map((o: any) => o.views).reduce((a: number, b: number) => a + b),
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
  let filteredList = list.filter((o: any) => o.typeId === req.query.feedpostId);
  if (req.query.parentId) {
    filteredList = filteredList.filter((o: any) => o.parentId === req.query.parentId);
  } else {
    filteredList = filteredList.filter((o: any) => !o.parentId);
  }
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
app.post('/v1/comments', (req, res) => {
  const list = require('./data/comments.json');
  const data = req.body;
  data._id = random(0, 1000) + '_id_' + random(0, 1000);
  data.createdBy = {
    "_id": "id_2",
    "firstName": "CC",
    "lastName": "name",
    "imageId": {
      "_id": "98712309823",
      "name": "string",
      "type": "png",
      "baseUrl": "https://picsum.photos",
      "key": "/200"
    }
  };
  data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  data.status = 'Active';
  list.push(req.body);
  if (data.parentId) {
    const comment = list.find((o: any) => o._id === data.parentId);
    if (comment.childCommentCount)
      comment.childCommentCount++;
    else
      comment.childCommentCount = 1;
  }
  fs.writeFileSync(__dirname + '/data/comments.json', JSON.stringify(list, null, 4));
  res.send({
    success: true,
    data,
  });
});
app.delete('/v1/comments/:commentId', (req, res) => {
  const list = require('./data/comments.json');
  let index = -1;
  console.log('index.ts > 188', req.params);
  list.forEach((o: any, i: number) => {
    if (o._id === req.params.commentId) {
      index = i;
    }
  });
  if (index > -1) {
    let o = list.splice(index, 1)[0];
    if (o.parentId) {
      const comment = list.find((comment: any) => comment._id === o.parentId);
      comment.childCommentCount--;
    }
  }
  fs.writeFileSync(__dirname + '/data/comments.json', JSON.stringify(list, null, 4));
  res.send({
    success: true,
  });
});
app.post('/v1/comments/add-rating', (req, res) => {
  const list = require('./data/comments.json');
  let updatedComment;
  list.forEach((o: any) => {
    if (o._id === req.body.typeId) {
      o.rated = o.rated === 1 ? 0 : 1;
      if (o.rated) {
        o.upVoteCount = o.upVoteCount ? (o.upVoteCount + 1) : 1;
      } else {
        o.upVoteCount = Math.max(o.upVoteCount ? (o.upVoteCount - 1) : 0);
      }
      updatedComment = o;
    }
  });
  fs.writeFileSync(__dirname + '/data/comments.json', JSON.stringify(list, null, 4));
  res.send({
    success: true,
    data: updatedComment
  });
});

const {exec} = require('child_process');

exec('ifconfig | grep 192.168.', (err: any, stdout: any, stderr: any) => {
  let s = stdout.toString();
  s = s.substring(s.indexOf('192.168'));
  let ip = s.substring(0, s.indexOf(' '));

  app.listen(process.env.PORT || 3000, () => {
    console.log('server is listening on ' + ip + ':' + (process.env.PORT || 3000));
  });
});
