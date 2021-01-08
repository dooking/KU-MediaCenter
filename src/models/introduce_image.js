module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "introduce_image",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
      },
      file: {
        type: DataTypes.STRING(100),
      },
      post_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
    },
    {
      tableName: "introduce_image",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );
  model.associate = (db) => {
    model.belongsTo(db.introduce_post, {
      foreignKey: "post_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  return model;
};
