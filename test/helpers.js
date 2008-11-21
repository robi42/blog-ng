var db = require('helma.dbstore.orm');

include('app.models.user');
include('app.models.article');
include('app.models.comment');

export('handleDbTxn',
       'createTestUser',
       'createTestArticle',
       'createTestComment');


function handleDbTxn(testCase) {
   testCase.setUp = function () {
      db.beginTxn();

      // reset DB content
      db.store.query('delete from Comment').executeUpdate();
      db.store.query('delete from Article').executeUpdate();
      db.store.query('delete from User').executeUpdate();
   };

   testCase.tearDown = function () {
      db.commitTxn();
   };
}


function createTestUser() {
   var data = {
      name: 'testUser',
      password: 'pass',
      websiteUrl: 'soup.robert42.com'
   };
   var user = createUser(data).obj;

   return user;
}


function createTestArticle() {
   var user = this.createTestUser();
   var data = {
      creator: user,
      title: 'Test Title',
      text: 'Some text.'
   };
   var article = createArticle(data).obj;

   return article;
}


function createTestComment() {
   var article = this.createTestArticle();
   db.commitTxn();

   db.beginTxn();
   article = Article.get(article.id);
   var user = article.creator;
   var data = {
      creator: user,
      articleTargetId: article.id,
      text: 'Some text.'
   };
   var comment = createComment(data).obj;
   db.commitTxn();

   db.beginTxn();
   comment = Comment.get(comment.id);

   return comment;
}
