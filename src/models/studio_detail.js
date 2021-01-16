module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
      "studio_detail",
      {
        id: {
          type: DataTypes.INTEGER(5),
          primaryKey: true,
          autoIncrement: true,
        },
        studio_id: {
          type: DataTypes.INTEGER(5),
        },
        state: {
          type: DataTypes.INTEGER(5),
          allowNull: false,
          comment: '0: 대여 가능 / 1: 대여 중 / 2: 기타', 
        },
        remark: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: "studio_detail",
        timestamps: false,
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
    model.associate = (db) => {
      model.belongsTo(db.studio, {
        foreignKey: "studio_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    };
    return model;
  };
  