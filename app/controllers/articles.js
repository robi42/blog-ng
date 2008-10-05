include('app.modules.security');
include('app.modules.rendering');

include('app.models.article');
var {getSessionUser} = require('app.models.user');


function index(req, res) {
   var paginationData = {
      firstItem: parseInt(req.params.first) || 0,
      maxItems: 4,
      collection: Article.all()
   };
   var items = Article.list({ first: paginationData.firstItem,
                              max: paginationData.maxItems,
                              orderBy: 'createTime' });

   var context = {
      loginLink: function (macrotag, skin) {
         renderSub(res, macrotag, skin, !getChecks(req).isSessionUser);
      },
      registerLink: function (macrotag, skin) {
         renderSub(res, macrotag, skin, !getChecks(req).isSessionUser);
      },
      createArticleLink: function (macrotag, skin) {
         renderSub(res, macrotag, skin, getChecks(req).isSessionUserAdmin);
      },
      logoutLink: function (macrotag, skin, context) {
         renderSub(res, macrotag, skin, getChecks(req).isSessionUser, context);
      },
      listArticles: function (macrotag, skin) {
         renderList(items, skin);
      },
      pagination: function(macrotag, skin) {
         renderPagination(skin, paginationData);
      }
   };
   renderView(req, res, context);
}


function show(req, res) {
   var article = Article.get(req.params.id);

   if (article) {
      var context = {
         object: article,
         adminTasks: function (macrotag, skin, context) {
            renderSub(macrotag, skin, getChecks().isSessionUserAdmin, context);
         },
         listComments: function (macrotag, skin) {
            renderList(article.comments.helmatize(), skin);
         },
         loginRegisterInfo: function (macrotag, skin) {
            renderSub(macrotag, skin, !getChecks().isSessionUser);
         },
         addCommentForm: function (macrotag, skin, context) {
            renderSub(macrotag, skin, getChecks().isSessionUser, context);
         }
      };
      renderView(req, res, context);
   } else {
      res.redirect('articles');
   }
}


function create(req, res) {
   checkAccess(req, res, this);

   if (req.isPost()) {
      try {
         req.params.creator = getSessionUser(req);
         req.session.data.message = createArticle(req.params).msg;
         res.redirect('/');
      } catch (e) {
         req.session.data.message = e.toString();
      }
   }

   var context = {
      title: req.params.title,
      text: req.params.text
   };
   renderView(req, res, context);
}

function checkAccessCreate() {
   return getChecks().isSessionUserAdmin;
}


function edit(req, res) {
   checkAccess(req, res, this);

   if (req.isPost()) {
      try {
         req.session.data.message = updateArticle(req.params).msg;
         res.redirect('show?id=' + req.params.id);
      } catch (e) {
         req.session.data.message = e.toString();
      }
   }

   var article = Article.get(req.params.id);

   if (article) {
      renderView(req, res, { object: article });
   } else {
      res.redirect('articles');
   }
}

function checkAccessEdit() {
   return this.checkAccessCreate();
}


function destroy(req, res) {
   checkAccess(req, res, this);

   if (req.isPost()) {
      try {
         req.session.data.message = deleteArticle(req.params.id).msg;
         res.redirect('/');
      } catch (e) {
         req.session.data.message = e.toString();
      }
   }

   var article = Article.get(req.params.id);

   if (article) {
      renderView(req, res, { object: article });
   } else {
      res.redirect('articles');
   }
}

function checkAccessDestroy() {
   return this.checkAccessCreate();
}


function atom_xml(req, res) {
   res.contentType = 'application/atom+xml';
   res.write(getArticlesFeed('atom_1.0'));
}
