var {User} = require('app.models.user');


function index(req, res) {
   if (User.all().size() == 0) {
      res.redirect('account');
   }

   res.redirect('articles');
}
