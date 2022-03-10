'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //detail_transaksi ke transaksi
      this.belongsTo(models.transaksi, {
        foreignKey: "id_transaksi",
        as: "transaksi"
      })
      //transaksi ke paket
      this.belongsTo(models.paket, {
        foreignKey: "id_paket",
        as: "detail paket"
      })
}
  };
  detail_transaksi.init({
    id_detail_transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_paket: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: 'detail_transaksi'
  });
  return detail_transaksi;
};