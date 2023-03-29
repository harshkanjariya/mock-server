import {random} from "lodash";

require('dotenv').config();
import express from 'express';
import * as fs from 'fs';
import * as _ from 'lodash';
import moment from 'moment';
import {exec} from "child_process";

const app = express();

const cors = require('cors');
app.use(cors({
  origin: true,
}));

app.use(express.json());

app.get('/nuggets', (req, res) => {
  res.send(require('./data/nuggets.json'));
});

exec('ifconfig | grep 192.168.', (err: any, stdout: any, stderr: any) => {
  let s = stdout.toString();
  s = s.substring(s.indexOf('192.168'));
  let ip = s.substring(0, s.indexOf(' '));

  app.listen(process.env.PORT || 3000, () => {
    console.log('server is listening on ' + ip + ':' + (process.env.PORT || 3000));
  });
});
