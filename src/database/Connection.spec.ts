/**
 * Created by hxg on 9/10/17.
 * converted to TS by kis on 3/7/18
 */
import * as dotenv from 'dotenv';
dotenv.config();

import {default as log} from '../logs/Log';
import {default as connection} from './Connection';

describe('Connection', () => {
  const chai = require('chai');
  const expect = chai.expect;

  it('should connect ', (done) => {
    const db = connection.getDb();

    db.any('select * from current_date', []).then((data: any) => {
      log.info('data: %j',data);
      expect(data).to.be.ok;
      done();
    })
    .catch((error: any) => {
      log.error('catch: %j', error);
      done(error);
    });

  });

});
