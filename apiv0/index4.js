const express = require('express');
const neo4j = require('neo4j-driver');

// Inicialización de la aplicación
const app = express();
const port = 3000;

// Configuración de Neo4j
const neo4jDriver = neo4j.driver('neo4j+s://06186317.databases.neo4j.io', neo4j.auth.basic('neo4j', 'l_8kcEguOrD7Y1nuaJKfWQnu_JIub0uUCjbTbwDPQLo'));

// Middlewares
app.use(express.json());

// Rutas
app.post('/user', async (req, res) => {
    const session = neo4jDriver.session();
    try {
        const { name, lastName, documentId, vitalKey, createdAt } = req.body;
        await session.run('CREATE (u:UserCollect {name: $name, lastName: $lastName, documentId: $documentId, vitalKey: $vitalKey, createdAt: $createdAt})', {
            name,
            lastName,
            documentId,
            vitalKey,
            createdAt,
        });
        return res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
    } finally {
        session.close();
    }
});

app.post('/vitaldata', async (req, res) => {
    const session = neo4jDriver.session();
    try {
      const { data, eventType, date, createdAt, vitalKeyData, vitalKey } = req.body;
  
      // Crear el nodo VitalData y establecer la relación con UserCollect
      await session.run(`
        MATCH (u:UserCollect {vitalKey: $vitalKey})
        CREATE (u)-[:${eventType}]->(v:VitalData {data: $data, eventType: $eventType, date: $date, createdAt: $createdAt, vitalKeyData: $vitalKeyData})
      `, {
        data,
        eventType,
        date,
        createdAt,
        vitalKeyData,
        vitalKey,
      });
  
      return res.status(201).json({ mensaje: 'Datos vitales creados exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
    } finally {
      session.close();
    }
});
  

app.post('/activity', async (req, res) => {
    const session = neo4jDriver.session();
    try {
      const { user_key, data } = req.body;
      const { source, ...activity } = data;
      const userCollect = await session.run('MATCH (uc:UserCollect {vitalKey: $vitalKey}) RETURN uc', { vitalKey: source.slug });
      const userCollectId = userCollect.records[0].get('uc').identity.toString();
  
      const result = await session.run(`
        MATCH (uc:UserCollect {vitalKey: $vitalKey}), (a:Activity {id: $activityId})
        WHERE NOT (uc)-[:CREATED]->(a)
        CREATE (uc)-[r:CREATED]->(a)
        RETURN a
      `, {
        vitalKey: source.slug,
        activityId: activity.id,
        ...activity,
        userCollectId,
        user_key,
      });
  
      return res.status(201).json({ mensaje: 'Actividad creada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
    } finally {
      session.close();
    }
  });
  



// Inicialización del servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
