const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "database-1.c2aojwrpzflm.us-east-1.rds.amazonaws.com",
    password: "stefano00",
    database: "postgres",
    port: 5432,
});

pool.connect();

async function nuevoCurso(curso) {
    try {
        console.log("curso ", curso);
        const res = await pool.query(
            `INSERT INTO cursos values(nextval('cursos_id_seq'),'${curso.nombre}', ${curso.nivelTecnico}, '${curso.fechaInicio}', ${curso.duracion}) RETURNING *`
        );
        return res.rows;
    } catch (e) {
        console.log("ERROR: ", e);
        return e;
    }
};



async function getCursos() {
    try {
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function editCurso(curso) {
    try {
        console.log("curso ", curso);
        const res = await pool.query(
            `UPDATE cursos SET nombre = '${curso.nombre}', nivel = ${curso.nivelTecnico}, fecha = '${curso.fechaInicio}', duracion = ${curso.duracion} WHERE id = ${curso.id} RETURNING *`
        );
        return res.rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function deleteCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id =
    '${id}'`);
        return result.rowCount;
    } catch (e) {
        return e;
    }
}

module.exports = {
    nuevoCurso,
    getCursos,
    editCurso,
    deleteCurso
};
