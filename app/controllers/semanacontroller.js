import { Semana } from '../models/semana';

export function guardarSemana(id,semana, anio, descripcion, mes, horas, color) {
  // Crear la instancia del modelo Tarjeta con los valores de los inputs
  const nuevaSemana = new Semana({
    id: id,
    semana: semana,
    anio: anio,
    descripcion: descripcion,
    mes: mes,
    horas: horas,
    color: color
  });

  // Guardar la nueva tarjeta en la base de datos
  nuevaSemana.save(function(err, semanaGuardada) {
    if (err) {
      console.error(err);
    } else {
      console.log('Semana guardada:', semanaGuardada);
    }
  });
}
