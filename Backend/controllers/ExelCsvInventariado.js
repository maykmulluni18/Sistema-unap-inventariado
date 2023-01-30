import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
const __dirname = path.resolve();


export const Excelupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cargue un archivo de Excel" });
    }

    const path = __dirname + "/uploads/" + req.file.filename;
    const rows = await readXlsxFile(path);
    // skip header
    rows.shift();

    // Use map instead of forEach to create the data array
    const datas_invent = rows.map((row) => {
      return {
        item: row[0],
        descripcion: row[1],
        cuenta: row[2],
        unidad: row[3],
        cantidad_inicial: row[4],
        cantidad: row[5],
        precio: row[6],
        fecha_registro: row[7],
        createdAt: row[8],
        updatedAt: row[9]
      };
    });

    await ModelsInvenInicial.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo se ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.message
    });
  }
};


export const getReporInventariado = (req, res) => {
    ModelsInvenInicial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const download = (req, res) => {
    ModelsInvenInicial.findAll().then((objs) => {
    let datas_invent = [];

    objs.forEach((obj) => {
        datas_invent.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(datas_invent);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

