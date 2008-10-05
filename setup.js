var httpConf = {
   staticDir: 'static'
};


var urls = [
   [ /^$/,                   'app.controllers.main.index' ],
   [ /^account$/,            'app.controllers.account.index' ],
   [ /^account\/register$/,  'app.controllers.account.register' ],
   [ /^account\/login$/,     'app.controllers.account.login' ],
   [ /^account\/logout$/,    'app.controllers.account.logout' ],
   [ /^articles$/,           'app.controllers.articles.index' ],
   [ /^articles\/show/,      'app.controllers.articles.show' ],
   [ /^articles\/create/,    'app.controllers.articles.create' ],
   [ /^articles\/edit/,      'app.controllers.articles.edit' ],
   [ /^articles\/delete/,    'app.controllers.articles.destroy' ],
   [ /^articles\/atom\.xml/, 'app.controllers.articles.atom_xml' ],
   [ /^comments$/,           'app.controllers.comments.index' ],
   [ /^comments\/create/,    'app.controllers.comments.create' ],
   [ /^comments\/atom\.xml/, 'app.controllers.comments.atom_xml' ],
];
