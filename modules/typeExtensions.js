var system = require('helma.system');

__shared__ = true;


var JDate = system.extendJavaClass(java.util.Date);

JDate.prototype.format = function (formatString) {
   var sdf = new java.text.SimpleDateFormat(formatString);
   return sdf.format(this);
};


var Map = system.extendJavaClass(java.util.Map);

Map.prototype.__iterator__ = function () { 
   return Iterator(this.entrySet());
};
