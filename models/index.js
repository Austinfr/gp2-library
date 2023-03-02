const User = require('./User');
const Card = require('./Card');
const Books = require('/.Books')
User.hasOne(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Card.belongsTo(User, {
  foreignKey: 'user_id'
});

//Books.
module.exports = { User, Card, Books};

//needed to double check