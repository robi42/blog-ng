var {getChecks} = require('app.modules.security');
include('app.modules.rendering');

include('app.models.user');


function index(req, res) {
   res.redirect('account/register');
}


function register(req, res) {
   if (req.isPost()) {
      try {
         createUser(req.params);
         req.session.data.message = loginUser(req.params).msg;
         res.redirect('/');
      } catch (e) {
         req.session.data.message = e.toString();
      }
   }

   var context = {
      adminPrefix: function (macrotag, skin) {
         renderSub(macrotag, skin, !getChecks(req).areUsersRegistered);
      },
      name: req.params.name,
      password: req.params.password,
      websiteUrlInput: function (macrotag, skin) {
         renderSub(macrotag, skin, getChecks(req).areUsersRegistered);
      },
      websiteUrl: req.params.websiteUrl
   };
   renderView(req, res, context);
}


function login(req, res) {
   if (User.all().size() == 0) {
      res.redirect('account/register');
   } else {
      if (req.isPost()) {
         try {
            req.session.data.message = loginUser(req).msg;
            res.redirect('/');
         } catch (e) {
            req.session.data.message = e.toString();
         }
      }

      var context = {
         name: req.params.name,
         password: req.params.password
      };
      renderView(req, res, context);
   }
}


function logout(req, res) {
   try {
      req.session.data.message = logoutUser(req).msg;
   } catch (e) {
      req.session.data.message = e.toString();
   }
   res.redirect('/');
}
