'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whale extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Whale.init(
    {
      image:DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Whale',
    }
  );
  return Whale;
};
