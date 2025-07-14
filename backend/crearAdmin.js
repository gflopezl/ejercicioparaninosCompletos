const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario'); // ajusta si tu ruta es distinta

mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function crearAdmin() {
  const correo = 'gabrielafer.lopez@gmail.com';
  const contraseña = 'admin123'; // puedes cambiarla
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const yaExiste = await Usuario.findOne({ correo });
  if (yaExiste) {
    console.log('⚠️ Ya existe un usuario con ese correo');
    return mongoose.disconnect();
  }

  const nuevoAdmin = new Usuario({
    nombre: 'Administrador',
    fechaNacimiento: new Date('1990-01-01'),
    correo,
    contraseña: hashedPassword,
    rol: 'admin'
  });

  await nuevoAdmin.save();
  console.log('✅ Administrador creado correctamente');
  mongoose.disconnect();
}

crearAdmin();
