import { Tarjeta } from '../models/semana';

export function guardarTarjeta(id,semana, anio, descripcion, mes, horas, color) {
  // Crear la instancia del modelo Tarjeta con los valores de los inputs
  const nuevaTarjeta = new Tarjeta({
    id: id,
    semana: semana,
    anio: anio,
    descripcion: descripcion,
    mes: mes,
    horas: horas,
    color: color
  });

  // Guardar la nueva tarjeta en la base de datos
  nuevaTarjeta.save(function(err, tarjetaGuardada) {
    if (err) {
      console.error(err);
    } else {
      console.log('Tarjeta guardada:', tarjetaGuardada);
    }
  });
}
