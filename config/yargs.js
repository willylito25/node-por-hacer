const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea'
};
const completado = {
    alias: 'c',
    default: true
};
const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', { descripcion })
    .command('listar', 'Muestra todas las tareas')
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borrar una tarea no deseada', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}