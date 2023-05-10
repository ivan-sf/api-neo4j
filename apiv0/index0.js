const express = require('express');
const redis = require('redis');
const neo4j = require('neo4j-driver');
const { check, validationResult } = require('express-validator');

// Inicialización de la aplicación
const app = express();
const port = 3000;

// Configuración de Redis
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

redisClient.on('error', (err) => {
  console.error(err);
});

// Configuración de Neo4j
const neo4jDriver = neo4j.driver('neo4j+s://06186317.databases.neo4j.io', neo4j.auth.basic('neo4j', 'l_8kcEguOrD7Y1nuaJKfWQnu_JIub0uUCjbTbwDPQLo'));

// Middlewares
app.use(express.json());

// Rutas
app.post(
  '/usuarios',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, edad, email } = req.body;

    const session = neo4jDriver.session();
    try {
      await session.run('CREATE (u:Usuario {nombre: $nombre, edad: $edad, email: $email})', {
        nombre,
        edad,
        email,
      });
      redisClient.incr('usuarios_creados');
      return res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
    } finally {
      session.close();
    }
  }
);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
