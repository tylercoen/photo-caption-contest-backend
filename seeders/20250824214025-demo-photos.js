"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          url: "/workspaces/photo-caption-contest-backend/photos/building-5115897_1280.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/workspaces/photo-caption-contest-backend/photos/building-7758389_1280.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/workspaces/photo-caption-contest-backend/photos/cat-9752539_1280.webp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/workspaces/photo-caption-contest-backend/photos/robin-9616505_1280.webp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
