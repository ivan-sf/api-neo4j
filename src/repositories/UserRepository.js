const neo4jDriver = require('../config/database');
const User = require('../models/User');

class UserRepository {
  async create(user) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run('CREATE (u:UserCollect {name: $name, last_name: $last_name, document_id: $document_id, vital_key: $vital_key, created_at: $created_at}) RETURN u', {
        name: user.name,
        last_name: user.last_name,
        document_id: user.document_id,
        vital_key: user.vital_key,
        created_at: user.created_at,
      });
      const createdUser = result.records[0].get('u').properties;
      return new User(createdUser.created_at, createdUser.created_at, createdUser.created_at, createdUser.created_at, createdUser.created_at);
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
        MATCH (u:UserCollect {vital_key: $id})
        SET u += {
          name: $name,
          last_name: $last_name,
          vital_key: $vital_key
        }
        RETURN u
      `, {
        id,
        name: updatedUser.name,
        last_name: updatedUser.last_name,
        vital_key: updatedUser.vital_key
      });
      let updatedNode = false;
      result.records.length > 0 
        ? updatedNode  = result.records[0].get('u').properties
        : null
      // const updatedNode = result
      if (!updatedNode) {
        throw new Error(`No se encontró ningún usuario con vital key ${id}`);
      }
      return new User(updatedNode.name, updatedNode.last_name, updatedNode.document_id, updatedNode.vital_key, updatedNode.created_at);
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
        MATCH (u:UserCollect {vital_key: $id})
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

  async findByVitalKey(vital_key) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(`MATCH(u: UserCollect { vital_key: $vital_key }) RETURN u`, {
        vital_key
      });
      const foundNode = result.records[0]?.get('u')?.properties;
      if (!foundNode) {
        return null;
      }
      return new User(foundNode.name, foundNode.last_name, foundNode.document_id, foundNode.vital_key, foundNode.created_at);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }

async createDataDayActivity(data, event_type) {
  const { data: { calendar_date, user_key }} = data;
  const dataString = JSON.stringify(data);
  const session = neo4jDriver.session();
  try {
    const result = await session.run(`
    MATCH (u:UserCollect { vital_key: $user_key })
    MERGE (d:DataDay { calendar_date: $calendar_date, vital_key_data_day: $user_key })
    MERGE (a:Activity { event_type: $event_type, calendar_date_activity: $calendar_date, vital_key_activity: $user_key })
    ON CREATE SET a.created_at = datetime()
    CREATE (ua:UpdateActivity { data: $dataString, created_at: datetime(), vital_key_update_activity: $user_key })
    MERGE (u)-[:Day]->(d)
    MERGE (d)-[:DataActivity]->(a)
    ON CREATE SET a.created_at = datetime()
    MERGE (a)-[:UpdateData]->(ua)
    RETURN d, a, ua
    `, {
      user_key,
      calendar_date,
      event_type,
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


}

module.exports = UserRepository;
