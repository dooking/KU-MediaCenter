module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "introduce_post",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
      },
      subtitle: {
        type: DataTypes.STRING(200),
      },
      content: {
        type: DataTypes.TEXT,
      },
      intro_equip_type: {
        type: DataTypes.STRING(100),
      },
      intro_equip_count: {
        type: DataTypes.INTEGER(5),
      },
      tab_id: {
        type: DataTypes.INTEGER(5),
      },
    },
    {
      tableName: "introduce_post",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );
  model.associate = (db) => {
    model.belongsTo(db.introduce_tab, {
      foreignKey: "tab_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  return model;
};
