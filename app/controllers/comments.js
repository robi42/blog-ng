include('app.modules.security');

include('app.models.comment');
var {getSessionUser} = require('app.models.user');


function index(req, res) {
   res.redirect('/');
}


function create(req, res) {
   checkAccess(req, res, this);

   if (req.isPost()) {
      try {
         req.params.creator = getSessionUser(req);
         session.data.message = createComment(req.params).msg;
         res.redirect('/articles/show?id=' + req.params.articleTargetId + '#addComment');
      } catch (e) {
         req.session.data.message = e.toString();
      }
   }

   res.redirect('/articles/show?id=' + req.params.articleTargetId + '#addComment');
}

function checkAccessCreate() {
   return getChecks().isSessionUser;
}


function atom_xml(req, res) {
   res.contentType = 'application/atom+xml';
   res.write(getCommentsFeed('atom_1.0'));
}
