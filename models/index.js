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

User.hasMany(Book, {
  foreignKey: 'borrowed_by',
  onDelete: 'SET NULL'
});

Book.belongsTo(User, {
  foreignKey: 'borrowed_by'
})
module.exports = { User, Card, Book};

//needed to double check