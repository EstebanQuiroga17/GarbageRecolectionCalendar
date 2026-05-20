// Grupos de la residencia
const grupoEntreSemana = ['Esteban', 'Isa', 'Kerlly', 'Jenny', 'Jeremy'];
const grupoFinSemana = ['Gia', 'Jeff', 'Hayden', 'Deyvid'];

// Lógica de fechas
const fechaBase = new Date('2026-01-01T00:00:00'); 
const hoy = new Date();

// Mostrar la fecha actual en la interfaz
const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let textoFecha = hoy.toLocaleDateString('es-ES', opcionesFecha);
textoFecha = textoFecha.charAt(0).toUpperCase() + textoFecha.slice(1);
document.getElementById('date-display').innerText = textoFecha;

// Calcular semanas transcurridas desde la fecha base
const milisegundosPorSemana = 1000 * 60 * 60 * 24 * 7;
const diferenciaTiempo = hoy.getTime() - fechaBase.getTime();
const semanasTranscurridas = Math.floor(diferenciaTiempo / milisegundosPorSemana);

// Función para rotar la fila circular
function rotarFila(arreglo, desplazamientos) {
    const rotacion = desplazamientos % arreglo.length;
    return [...arreglo.slice(rotacion), ...arreglo.slice(0, rotacion)];
}

// Generar los grupos de la semana actual
const filaSemanaActual = rotarFila(grupoEntreSemana, semanasTranscurridas);
const filaFindeActual = rotarFila(grupoFinSemana, semanasTranscurridas);

// Mostrar quiénes descansan esta semana (los que quedan en la posición 0)
document.getElementById('resting-people').innerText = `${filaSemanaActual[0]} y ${filaFindeActual[0]}`;

// Mapear el cronograma de la semana
const cronograma = [
    { id: 1, dia: 'Lunes', persona: filaSemanaActual[1], grupo: 'Entre semana' },
    { id: 2, dia: 'Martes', persona: filaSemanaActual[2], grupo: 'Entre semana' },
    { id: 3, dia: 'Miércoles', persona: filaSemanaActual[3], grupo: 'Entre semana' },
    { id: 4, dia: 'Jueves', persona: filaSemanaActual[4], grupo: 'Entre semana' },
    { id: 5, dia: 'Viernes', persona: filaFindeActual[1], grupo: 'Fin de semana' },
    { id: 6, dia: 'Sábado', persona: filaFindeActual[2], grupo: 'Fin de semana' },
    { id: 0, dia: 'Domingo', persona: filaFindeActual[3], grupo: 'Fin de semana' }
];

// Inyectar los datos en la tabla HTML
const tbody = document.getElementById('schedule-body');
const diaHoyIndex = hoy.getDay(); // 0 es Domingo, 1 es Lunes, etc.

cronograma.forEach(turno => {
    const tr = document.createElement('tr');
    
    // Si el turno coincide con el día de hoy, resaltar la fila y actualizar la tarjeta principal
    if (turno.id === diaHoyIndex) {
        tr.classList.add('today-row');
        document.getElementById('today-person').innerText = turno.persona;
    }

    // Inyectar celdas con data-label para responsividad en celulares
    tr.innerHTML = `
        <td data-label="Día">${turno.dia}</td>
        <td data-label="Encargado/a">${turno.persona}</td>
        <td data-label="Grupo">${turno.grupo}</td>
    `;
    tbody.appendChild(tr);
});