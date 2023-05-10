const neo4jDriver = require('../config/database');

class ActivityRepository {
    async createDataDayActivity(data, event_type) {
        const { data: { calendar_date, user_key } } = data;
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

module.exports = ActivityRepository;
