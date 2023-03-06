
const sequelize = require('../config/connection');
const { User, Book} = require('../models');

const userData = require('./userData.json');
const bookData = require('./suggestBooks.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  
  await User.bulkCreate(userData, { individualHooks: true });
  await Book.bulkCreate(bookData);

  
  process.exit(0);
};

seedDatabase();
