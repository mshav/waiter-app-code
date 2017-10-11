const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl);

  const Workers = mongoose.model('waiter', {
    name: String,
    weekdays: Object
  });

  return {
    Workers
  };
}
