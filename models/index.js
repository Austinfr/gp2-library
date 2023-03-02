const User = require('./User');
const Card = require('./Card');
const Book = require('./Book');

User.hasOne(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Card.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Card, Book };

//needed to double check