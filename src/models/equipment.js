module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "equipment",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      kind: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "equipment",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );

  return model;
};
