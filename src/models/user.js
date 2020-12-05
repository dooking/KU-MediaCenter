module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      auth: {
        type: DataTypes.INTEGER(5),
      },
      penalty: {
        type: DataTypes.INTEGER(5),
      },
      state: {
        type: DataTypes.STRING(50),
      },
      major: {
        type: DataTypes.STRING(50),
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
