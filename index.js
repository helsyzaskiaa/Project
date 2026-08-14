import express from 'express';
import db from './db.js';
const app=express();
const PORT=5050;

app.use(express.json());

db.authenticate()
.then(()=> console.log('Database Connected...'))
.catch(err=>console.log('error'+ err));
 app.get('/',(req,res)=>{
    res.send('Server SIM Klinik berhasil');
 });
  app.listen(PORT,()=>{
    console.log(`server jalan di http://localhost:${PORT}`);

  });
