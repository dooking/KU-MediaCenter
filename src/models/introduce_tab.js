module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
      "introduce_tab",
      {
        id: {
          type: DataTypes.INTEGER(5),
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        subtitle: {
          type: DataTypes.STRING(200),
        },
      },
      {
        tableName: "introduce_tab",
        timestamps: false,
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );

    return model;
  };
  