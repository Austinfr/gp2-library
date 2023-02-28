const User = require('./User');
const Card = require('./Card');

User.hasOne(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Card.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Card };

//needed to double check