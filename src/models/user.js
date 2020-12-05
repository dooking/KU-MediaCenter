module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      identity: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      auth: {
        type: DataTypes.INTEGER(5),
        defaultValue: 0,
      },
      penalty: {
        type: DataTypes.INTEGER(5),
        defaultValue: 0,
      },
      state: {
        type: DataTypes.STRING(50),
        defaultValue: 0,
      },
      major: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );

  return model;
};
