require('helma.webapp.request');


function handleMessage(req, res) {
   var message = req.session.data.message || null;

   if (req.session.data.message) {
      req.session.data.message = "";
   }

   return message;
}
