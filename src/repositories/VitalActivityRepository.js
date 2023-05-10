const neo4jDriver = require('../config/database');

class ActivityRepository {
    async createDataDayActivity(data, event_type) {
        let relType = ''
        let nameNode = ''
        if(event_type === "daily.data.activity.updated"){
            relType = 'UpdatedData'
            nameNode = 'UpdatedActivity'
        }else if(event_type === "daily.data.activity.created"){
            relType = 'CreatedData'
            nameNode = 'CreatedActivity'
        }
        const { data: { calendar_date, user_id, source } } = data;
        console.log("source",source)
        const dataString = JSON.stringify(data);
        const session = neo4jDriver.session();
        try {
            const result = await session.run(`
                MATCH (u:UserCollect { vital_key: $user_id })
                MERGE (d:DataDay { calendar_date: $calendar_date, vital_key: $user_id })
                MERGE (s:Source { name: $source.name, logo: $source.logo, slug: $source.slug, vital_key: $user_id, calendar_date: $calendar_date })
                MERGE (a:Activity { event_type: $event_type, calendar_date_activity: $calendar_date, vital_key: $user_id })
                CREATE (ua:`+nameNode+` { data: $dataString, created_at: datetime(), vital_key: $user_id })
                MERGE (u)-[:Day]->(d)
                MERGE (d)-[:Source]->(s)
                MERGE (s)-[:DataActivity]->(a)
                MERGE (a)-[:`+relType+`]->(ua)
                RETURN d, a, ua, s
                `, {
                user_id,
                calendar_date,
                event_type,
                dataString,
                source
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