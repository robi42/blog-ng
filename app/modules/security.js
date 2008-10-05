include('app.models.user');


function getChecks(req) {
   return {
      areUsersRegistered: User.all().size() > 0,
      isSessionUser: req.session.data.userId ? true : false,
      isSessionUserAdmin: req.session.data.userId ?
                          getSessionUser(req).isAdmin :
                          false
   };
}


function checkAccess(req, res, moduleScope) {
   try {
      var path = req.path.split('/');
      var action = path[path.length - 1];
      var condition = moduleScope['checkAccess' + action.capitalize()]();

      if (!condition) {
         throw new Error('Access denied.');
      }
   } catch (e) {
      req.session.data.message = e.toString();
      res.redirect('/account/login');
   }
}
