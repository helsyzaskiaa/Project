const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const siswaRoutes = require("./routes/siswaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Alhamdullilah API ini berjalan" });
});

app.use("/api/siswa", siswaRoutes);

const PORT = process.env.PORT || 5050;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database MySQL berhasil terkoneksi guys");

    await sequelize.sync({alter: true});

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal koneksi database:", error);
  }
}

startServer();
