const neo4jDriver = require('../config/database');
const User = require('../models/User');

class UserRepository {
  async create(user) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run('CREATE (u:UserCollect {name: $name, lastName: $lastName, documentId: $documentId, vitalKey: $vitalKey, createdAt: $createdAt}) RETURN u', {
        name: user.name,
        lastName: user.lastName,
        documentId: user.documentId,
        vitalKey: user.vitalKey,
        createdAt: user.createdAt,
      });
      const createdUser = result.records[0].get('u').properties;
      return new User(createdUser.name, createdUser.lastName, createdUser.documentId, createdUser.vitalKey, createdUser.createdAt);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

  async update(id, updatedUser) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(`
        MATCH (u:UserCollect {vitalKey: $id})
        SET u += {
          name: $name,
          lastName: $lastName,
          vitalKey: $vitalKey
        }
        RETURN u
      `, {
        id,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        vitalKey: updatedUser.vitalKey
      });
      let updatedNode = false;
      result.records.length > 0 
        ? updatedNode  = result.records[0].get('u').properties
        : null
      // const updatedNode = result
      if (!updatedNode) {
        throw new Error(`No se encontró ningún usuario con vital key ${id}`);
      }
      return new User(updatedNode.name, updatedNode.lastName, updatedNode.documentId, updatedNode.vitalKey, updatedNode.createdAt);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }


  async delete(id) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(`
        MATCH (u:UserCollect {vitalKey: $id})
        DELETE u
        RETURN COUNT(u) as deletedCount
      `, {
        id
      });
      const deletedCount = result.records[0].get('deletedCount').low;
      if (deletedCount === 0) {
        throw new Error(`No se encontró ningún usuario con vital key ${id}`);
      }
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

  async findByVitalKey(vitalKey) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(`MATCH(u: UserCollect { vitalKey: $vitalKey }) RETURN u`, {
        vitalKey
      });
      const foundNode = result.records[0]?.get('u')?.properties;
      if (!foundNode) {
        return null;
      }
      return new User(foundNode.name, foundNode.lastName, foundNode.documentId, foundNode.vitalKey, foundNode.createdAt);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

async createDataDayActivity(data, eventType) {
  const { data: { calendar_date, user_key }} = data;
  const dataString = JSON.stringify(data);
  const session = neo4jDriver.session();
  try {
    const result = await session.run(`
    MATCH (u:UserCollect { vitalKey: $user_key })
    MERGE (d:DataDay { calendar_date: $calendar_date, vitalKeyDataDay: $user_key })
    MERGE (a:Activity { eventType: $eventType, calendar_date_activity: $calendar_date, vitalKeyActivity: $user_key })
    ON CREATE SET a.createdAt = datetime()
    CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
    MERGE (u)-[:Day]->(d)
    MERGE (d)-[:DataActivity]->(a)
    ON CREATE SET a.createdAt = datetime()
    MERGE (a)-[:UpdateData]->(ua)
    RETURN d, a, ua
    `, {
      user_key,
      calendar_date,
      eventType,
      dataString // Aquí es donde se agrega el parámetro faltante
    });
    const createdDataDay = result.records[0].get('d').properties;
    const createdActivity = result.records[0].get('a').properties;
    const createdUpdateActivity = result.records[0].get('ua').properties;
    return {
      createdDataDay,
      createdActivity,
      createdUpdateActivity
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
}


/////////////////////////////////
// OK CREA VARIOS NODOS DE ACTIVIDAD
/////////////////////////////////
// MATCH (u:UserCollect { vitalKey: $user_key })
//     MERGE (d:DataDay { calendar_date: $calendar_date })
//     CREATE (a:Activity { eventType: $eventType })
//     CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
//     MERGE (u)-[:Day]->(d)
//     MERGE (d)-[:DataActivity]->(a)
//     CREATE (a)-[:UpdateData]->(ua)
//     RETURN d, a, ua
  
/////////////////////////////////
// OK CREA UN UNICO NODO DE ACTIVIDAD
/////////////////////////////////
// MATCH (u:UserCollect { vitalKey: $user_key })
// MERGE (d:DataDay { calendar_date: $calendar_date })
// MERGE (a:Activity { eventType: $eventType })
// CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
// MERGE (u)-[:Day]->(d)
// MERGE (d)-[:DataActivity]->(a)
// CREATE (a)-[:UpdateData]->(ua)
// RETURN d, a, ua

/////////////////////////////////
// OK FUNCIONAL SIN VITAL KEY EN DataDay
/////////////////////////////////
// MATCH (u:UserCollect { vitalKey: $user_key })
//     MERGE (d:DataDay { calendar_date: $calendar_date })
//     MERGE (a:Activity { eventType: $eventType, calendar_date: $calendar_date })
//     CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
//     MERGE (u)-[:Day]->(d)
//     MERGE (d)-[:DataActivity]->(a)
//     CREATE (a)-[:UpdateData]->(ua)
//     RETURN d, a, ua


/////////////////////////////////
// OK FUNCIONAL SIN VITAL KEY EN Activity
/////////////////////////////////
// MATCH (u:UserCollect { vitalKey: $user_key })
//     MERGE (d:DataDay { calendar_date: $calendar_date, vitalKeyDataDay: $user_key })
//     MERGE (a:Activity { eventType: $eventType, calendar_date_activity: $calendar_date })
//     ON CREATE SET a.createdAt = datetime()
//     CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
//     MERGE (u)-[:Day]->(d)
//     MERGE (d)-[:DataActivity]->(a)
//     ON CREATE SET a.createdAt = datetime()
//     MERGE (a)-[:UpdateData]->(ua)
//     RETURN d, a, ua


/////////////////////////////////
// OK FUNCIONAL TODO INDEPENDIENTE
/////////////////////////////////
// MATCH (u:UserCollect { vitalKey: $user_key })
// MERGE (d:DataDay { calendar_date: $calendar_date, vitalKeyDataDay: $user_key })
// MERGE (a:Activity { eventType: $eventType, calendar_date_activity: $calendar_date, vitalKeyActivity: $user_key })
// ON CREATE SET a.createdAt = datetime()
// CREATE (ua:UpdateActivity { data: $dataString, createdAt: datetime(), vitalKeyUpdateActivity: $user_key })
// MERGE (u)-[:Day]->(d)
// MERGE (d)-[:DataActivity]->(a)
// ON CREATE SET a.createdAt = datetime()
// MERGE (a)-[:UpdateData]->(ua)
// RETURN d, a, ua
}

module.exports = UserRepository;
