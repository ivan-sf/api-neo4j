const neo4jDriver = require('../config/database');
const User = require('../models/User');

class UserRepository {
  async create(user) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(`
      MATCH (c:Company {company_key: $company_key_user})
      CREATE (u:UserCollect {name: $name, last_name: $last_name, document_id: $document_id, vital_key: $vital_key, created_at: $created_at})-[:BELONGS_TO]->(c)
      RETURN u
      `, {
        name: user.name,
        last_name: user.last_name,
        document_id: user.document_id,
        vital_key: user.vital_key,
        company_key_user: user.company_key_user,
        created_at: user.created_at,
      });
      const createdUser = result.records[0].get('u').properties;
      return new User(createdUser.name, createdUser.last_name, createdUser.document_id, createdUser.vital_key, createdUser.created_at, createdUser.company_key_user);
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



}

module.exports = UserRepository;
