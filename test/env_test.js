include('helma.unittest');

var db = require('helma.dbstore.orm');

include('test.helpers');

var {User} = require('app.models.user');


var testCase = new TestCase('environment');

/**
 * Testing the test environment.
 */
testCase.testTruth = function () {
   assertTrue(true);
};

/**
 * Testing the Hibernate environment.
 */
testCase.testHibernate = function () {
   db.beginTxn();

   db.store.query('delete from Comment').executeUpdate();
   db.store.query('delete from Article').executeUpdate();
   db.store.query('delete from User').executeUpdate();

   createTestUser();

   assertEqual(User.all().size(), 1);

   db.commitTxn();
};
