import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
const __dirname = path.resolve();

export const Excelupload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
    __dirname + "/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let datas_invent = [];

      rows.forEach((row) => {
        let data_invent = {
          item: row[0],
          descripcion: row[1],
          cuenta: row[2],
          unidad: row[3],
          cantidad: row[4],
          precio: row[5],
          fecha_registro: row[6],
          createdAt: row[7],
          updatedAt: row[8]
        };

        datas_invent.push(data_invent);
      });

      ModelsInvenInicial.bulkCreate(datas_invent)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
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

