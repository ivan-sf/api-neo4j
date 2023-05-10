|-- src/
|   |-- controllers/
|   |   `-- UserController.js
|   |    -- ...
|   |-- services/
|   |   `-- UserService.js
|   |    -- ...
|   |-- repositories/
|   |   `-- UserRepository.js
|   |    -- ...
|   |-- models/
|   |   `-- User.js
|   |    -- ...
|   `-- index.js
|-- config/
|   `-- database.js
|-- package.json
|-- package-lock.json
`-- README.md






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