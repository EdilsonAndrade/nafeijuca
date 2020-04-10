require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_DIALECT || process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASENAME,
  storage: './__tests__/database.sqllite',
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
