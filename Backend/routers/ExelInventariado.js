
import express from 'express'
import { Excelupload, getReporInventariado } from '../controllers/ExelCsvInventariado.js';
import { uploadExel } from '../middleware/upload.js'

const router = express.Router();

router.post("/upload", uploadExel.single('file'),Excelupload,(req, res) =>{
    console.log(req.file);
    res.send("ok")
});

router.get("/tutorials", getReporInventariado);

//router.get("/download", excelController.download);

export default router