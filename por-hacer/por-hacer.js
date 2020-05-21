const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (e) => {
        if (e) throw new Error('No se pudo grabar', e);
        console.log('TAREA GUARDADA CON EXITO'.green);
    })
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');;
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    try {
        cargarDB();

        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;

    } catch (error) {
        return false
    }


    // Logica del profesor

    // cargarDB();
    // let nuevoListado = listadoPorHacer.filter(tarea => {
    //     return tarea.descripcion !== descripcion;
    // })

    // if (listadoPorHacer.length == nuevoListado.length) {
    //     return false;
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    //     return true;
    // }

}

const validationCompletado = (value) => {

    if (value == true) { return 'Realizada con exito' } else { return 'No realizada aun' }
}

const mostrarData = (listado) => {

    if (listado.length > 0) {
        console.log('============== POR HACER =============='.green);

        for (let tarea of listado) {
            console.log(colors.red('Tarea: '), tarea.descripcion, colors.red(' Estado: '), validationCompletado(tarea.completado));
        }

        console.log('======================================='.green);
    } else {
        return console.log('No hay data en la base de datos,'.yellow, 'DEBE DE CREAR UNA TAREA NUEVA'.red);
    }
}

module.exports = {
    crear,
    getListado,
    mostrarData,
    actualizar,
    borrar
}