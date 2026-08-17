const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Siswa = sequelize.define(
  "Siswa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Umur:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  },
  {
    tableName: "siswa",
    timestamps: true,
  }
  
);

module.exports = Siswa;
