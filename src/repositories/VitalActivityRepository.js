const neo4jDriver = require('../config/database');

class ActivityRepository {
    async createDataDayActivity(data, event_type, nameNodeTypeEvent) {
        let relType = ''
        let nameNodeEvent = ''
        if (event_type.includes("updated")) {
            relType = 'EVENT_UPDATED_DATA'
            nameNodeEvent = 'Updated'
        }else if (event_type.includes("created")) {
            relType = 'EVENT_CREATED_DATA'
            nameNodeEvent = 'Created'
        }else if (event_type.includes("historical")) {
            relType = 'EVENT_HISTORICAL_DATA'
            nameNodeEvent = 'Historical'
        }
        const { data: { calendar_date, user_id, source } } = data;
        const dataString = JSON.stringify(data);
        const session = neo4jDriver.session();
        try {
            const result = await session.run(`
                MATCH (u:UserCollect { vital_key: $user_id })
                MERGE (d:Day { calendar_date: $calendar_date, vital_key: $user_id })
                MERGE (s:Source { name: $source.name, logo: $source.logo, slug: $source.slug, vital_key: $user_id, calendar_date: $calendar_date })
                MERGE (a:`+nameNodeTypeEvent+` { event_type: $event_type, calendar_date_activity: $calendar_date, vital_key: $user_id })
                CREATE (ua:`+nameNodeEvent+` { data: $dataString, created_at: datetime(), vital_key: $user_id })
                MERGE (u)-[:CREATED_DATA]->(d)
                MERGE (d)-[:FROM_WEARABLE]->(s)
                MERGE (s)-[:HAS_EVENT]->(a)
                MERGE (a)-[:`+relType+`]->(ua)
                MERGE (ua)-[:CREATED_BY { calendar_date: $calendar_date }]->(u)
                MERGE (ua)-[:CREATED_ON { device: $source.slug }]->(s) 
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