'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('blog_posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },
    published: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated: {
      allowNull: false,
      type: Sequelize.DATE
    }
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('blog_posts');
  }
};
