#!/usr/bin/env helma

// specify the DB connector to be loaded
addToClasspath('lib/mysql-connector-java-5.1.6-bin.jar');
addToClasspath('config/cache');

var webapp = require('helma.webapp');
var {handleRequest} = require('helma.webapp');
require('helma.webapp.request');

var db = require('helma.dbstore.orm');
var log = require('helma.logging').getLogger(__name__);

require('modules.typeExtensions');


if (__name__ == '__main__') {
   webapp.start();

   db.setConfigPath('config/dev');
   db.addTxnCallbacks();

   log.info('Welcome to Hibernate Blog NG! ^^');
}
