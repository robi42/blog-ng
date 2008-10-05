var db = require('helma.dbstore.orm');

include('modules.model');
include('modules.validation');


function User(props) {

   return new db.Storable(this, props);
//   return this;
}
db.store.registerType(User);


function createUser(data) {
   this.validateCreateUser(data);

   var websiteUrl = (data.websiteUrl && !data.websiteUrl.startsWith('http://') &&
                     !data.websiteUrl.startsWith('https://')) ?
                    'http://' + data.websiteUrl : data.websiteUrl;
   var props = {
      createTime: new java.util.Date(),
      name: data.name.stripTags(),
      password: data.password.md5(),
      websiteUrl: websiteUrl ? websiteUrl.stripTags() : null,
      isAdmin: (User.all().size() == 0)
   };
   var user = new User(props);
   user.save();

   var msg = 'User "' + user.name + '" was registered successfully.';

   return new Result(msg, user);
}

function validateCreateUser(data) {
   validatePresenceOf(data.name.stripTags(), { msg: 'Name was empty.' });
   validatePresenceOf(data.password, { msg: 'Password was empty.' });
   if (data.websiteUrl) {
      validateFormatOf(data.websiteUrl.stripTags(),
                       { regex: /^(https?:\/\/)?[A-Za-z0-9\.-]{2,}\.[A-Za-z]{2}/,
                         msg: 'Website URL was invalid.' });
   }
   validateUniquenessOf(data.name.stripTags(), { key: 'name', type: User,
                                                 msg: 'User name "' +
                                                      data.name.stripTags() +
                                                      '" already exists.'});
}


function deleteUser(id) {
   var user = User.get(id);
   user.remove();

   return new Result('User was deleted successfully.');
}


function loginUser(req) {
   var userQuery = "where u.name = '" + req.params.name.stripTags() + "' and u.password = '" +
                   req.params.password.md5() + "'";
   var userQueryResult = User.find(userQuery);

   if (userQueryResult[0] && (userQueryResult[0].id == req.session.data.userId)) {
      throw new Error('User "' + userQueryResult[0].name + '" is already logged in.');
   } else if (userQueryResult[0]) {
      req.session.data.userId = userQueryResult[0].id;
      return new Result('Hello ' + userQueryResult[0].name + '!');
   } else {
      throw new Error('Login failed. Try again?');
   }
}


function logoutUser(req) {
   if (User.all().size() == 0) {
      throw new Error('No user registered yet.');
   } else if (!req.session.data.userId) {
      throw new Error('No user was logged in.');
   } else {
      req.session.data.userId = null;
      return new Result('Goodbye!');
   }
}


function getSessionUser(req) {
   return req.session.data.userId ? User.get(req.session.data.userId) : null;
}
