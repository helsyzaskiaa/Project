const Siswa = require("../models/Siswa");
const { Op } = require("sequelize");

// GET semua siswa
exports.getAll = async (req, res) => {
  try {
    const data = await Siswa.findAll({ order: [["id", "DESC"]] });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET siswa berdasarkan ID
exports.getById = async (req, res) => {
  try {
    const data = await Siswa.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Siswa tidak ditemukan" });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST tambah siswa
exports.create = async (req, res) => {
  try {
    const { nama, kelas, jurusan, Email } = req.body;
    if (!nama || !kelas || !jurusan || !Email) {
      return res.status(400).json({
        success: false,
        message: "nama, kelas, jurusan dan email wajib diisi",
      });
    }
    const data = await Siswa.create({ nama, kelas, jurusan, Email });
    res.status(201).json({
      success: true,
      message: "Data siswa berhasil ditambahkan",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update siswa
exports.update = async (req, res) => {
  try {
    const data = await Siswa.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Siswa tidak ditemukan" });
    }
    await data.update({
      nama: req.body.nama ?? data.nama,
      kelas: req.body.kelas ?? data.kelas,
      jurusan: req.body.jurusan ?? data.jurusan,
      Email: req.body.Email ?? data.Email
    });
    res.json({ success: true, message: "Data siswa berhasil diubah", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE siswa
exports.remove = async (req, res) => {
  try {
    const data = await Siswa.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Siswa tidak ditemukan" });
    }
    await data.destroy();
    res.json({ success: true, message: "Data siswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET pencarian siswa menggunakan Sequelize Op
exports.search = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const data = await Siswa.findAll({
      where: {
        [Op.or]: [
          { nama: { [Op.like]: `%${keyword}%` } },
          { kelas: { [Op.like]: `%${keyword}%` } },
          { jurusan: { [Op.like]: `%${keyword}%` } },
          { Email: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [["id", "DESC"]],
    });
    res.json({ success: true, keyword, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
