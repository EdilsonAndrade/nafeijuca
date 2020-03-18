module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line_two: {
        type: Sequelize.STRING,
      },
      zipcode: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('stores');
  },
};
