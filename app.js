const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer')
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        porHacer.mostrarData(listado);

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(String(argv.descripcion), argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}