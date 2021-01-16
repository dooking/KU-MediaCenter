module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
      "studio",
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
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        tableName: "studio",
        timestamps: false,
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
  
    return model;
  };
  