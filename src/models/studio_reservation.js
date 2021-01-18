module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
      "studio_reservation",
      {
        id: {
          type: DataTypes.INTEGER(5),
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER(5),
        },
        studio_detail_id: {
          type: DataTypes.INTEGER(5),
        },
        reservation_number: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        from_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        to_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        real_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        group: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        purpose: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        contact: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        authentication: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        remark: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        state: {
          type: DataTypes.INTEGER(5),
          allowNull: false,
          comment: '-1: 예약 취소 / 0: 예약 신청 / 1: 대여 중 / 2: 반납 완료 / 3: 연체 중 / 4: 연체 반납 완료 / 5: 기타', 
        },
        return_card_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '시즌2 추가 사항: 카드 반납일 입력', 
          },
      },
      {
        tableName: "studio_reservation",
        timestamps: false,
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
    model.associate = (db) => {
      model.belongsTo(db.studio_detail, {
        foreignKey: "studio_detail_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      model.belongsTo(db.user, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    };
    return model;
  };
  