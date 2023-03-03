
const sequelize = require('../config/connection');
const { User, Book, Card } = require('../models');

const userData = require('./userData.json');
const bookData = require('./suggestBooks.json');
const cardData = require('./cardData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  
  await User.bulkCreate(userData, { individualHooks: true });
  
  await Book.bulkCreate(bookData);
  await Card.bulkCreate(cardData);
  
  process.exit(0);
};

seedDatabase();
