module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "equipment_detail",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      equipment_id: {
        type: DataTypes.INTEGER(5),
      },
      serial_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      state: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        comment: '0: 대여 가능 / 1: 대여 중 / 2: 연체 중 / 3: 연장 / 4: 기타', 
      },
      remark: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "equipment_detail",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );
  model.associate = (db) => {
    model.belongsTo(db.equipment, {
      foreignKey: "equipment_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  return model;
};
