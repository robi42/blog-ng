#!/usr/bin/env helma

addToClasspath('lib/mysql-connector-java-5.1.6-bin.jar');
addToClasspath('config/cache');

var unittest = require('helma.unittest');
var db = require('helma.dbstore.orm');

require('modules.typeExtensions');


if (__name__ == '__main__') {
   db.setConfigPath('config/test');

   unittest.run('test.unit.models.suite');
}
