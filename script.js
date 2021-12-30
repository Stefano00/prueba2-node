const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000);

app.use(cors({
    origin: '*'
}));

const { nuevoCurso, getCursos, editCurso, deleteCurso } = require("./pool");
app.post("/curso", async (req, res) => {
    const respuesta = await nuevoCurso(req.body);
    res.send(respuesta);
});
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    res.send(respuesta);
});
app.put("/curso", async (req, res) => {
    console.log("PUT", req.body);
    const respuesta = await editCurso(req.body);
    res.send(respuesta);
});
app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0
        ? res.send(`El actor de id ${id} fue elimado con éxito`)
        : res.send("No existe un actor registrado con ese id");
});
console.log("ANDANDO en puerto 3000");