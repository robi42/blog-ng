#!/usr/bin/env helma

addToClasspath('lib/mysql-connector-java-5.1.6-bin.jar');

var db = require('helma.dbstore.orm');


if (__name__ == '__main__') {
   db.setConfigPath('config/dev');
   db.rebuildDbSchema();
}
