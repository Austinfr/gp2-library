const User = require('./User');
const Book = require('./Book');


User.hasMany(Book, {
  foreignKey: 'borrowed_by',
  onDelete: 'SET NULL'
});

Book.belongsTo(User, {
  foreignKey: 'borrowed_by'
});
module.exports = { User, Book};

//needed to double check