function calcularRangoEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  if (edad >= 3 && edad <= 6) return '3-6';
  if (edad >= 7 && edad <= 9) return '7-9';
  if (edad >= 10 && edad <= 12) return '10-12';
  return 'otro';
}

module.exports = calcularRangoEdad;
