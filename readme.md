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



***OK
**En proceso
*Estructura lista

daily.data.active_energy_burned.created
daily.data.active_energy_burned.updated
***daily.data.activity.created
***daily.data.activity.updated
daily.data.basal_energy_burned.created
daily.data.basal_energy_burned.updated
daily.data.blood_oxygen.created
daily.data.blood_oxygen.updated
daily.data.blood_pressure.created
daily.data.blood_pressure.updated
daily.data.body.created
daily.data.body.updated
daily.data.caffeine.created
daily.data.caffeine.updated
daily.data.device.created
daily.data.device.updated
daily.data.distance_running_walking.created
daily.data.distance_running_walking.updated
daily.data.fat.created
daily.data.fat.updated
daily.data.floors_climbed.created
daily.data.floors_climbed.updated
daily.data.glucose.created
daily.data.glucose.updated
daily.data.heartrate.created
daily.data.heartrate.updated
daily.data.hrv.created
daily.data.hrv.updated
daily.data.hypnogram.created
daily.data.hypnogram.updated
daily.data.ige.created
daily.data.ige.updated
daily.data.igg.created
daily.data.igg.updated
daily.data.meal.created
daily.data.meal.updated
*daily.data.meals.created
*daily.data.meals.updated
daily.data.mindfulness_minutes.created
daily.data.mindfulness_minutes.updated
daily.data.respiratory_rate.created
daily.data.respiratory_rate.updated
daily.data.sleep.created
daily.data.sleep.updated
daily.data.vo2_max.created
daily.data.vo2_max.updated
daily.data.water.created
daily.data.water.updated
daily.data.weight.created
daily.data.weight.updated
daily.data.workout_stream.created
daily.data.workouts.created
daily.data.workouts.updated
daily.workout_stream.created
daily.workout_stream.unavailable
historical.data.active_energy_burned.created
historical.data.activity.created
historical.data.basal_energy_burned.created
historical.data.blood_oxygen.created
historical.data.blood_pressure.created
historical.data.body.created
historical.data.caffeine.created
historical.data.device.created
historical.data.distance_running_walking.created
historical.data.fat.created
historical.data.floors_climbed.created
historical.data.glucose.created
historical.data.heartrate.created
historical.data.hrv.created
historical.data.hypnogram.created
historical.data.ige.created
historical.data.igg.created
historical.data.meal.created
historical.data.meals.created
historical.data.mindfulness_minutes.created
historical.data.profile.created
historical.data.respiratory_rate.created
historical.data.sleep.created
historical.data.vo2_max.created
historical.data.water.created
historical.data.weight.created
historical.data.workouts.created
labtest.order.created
labtest.order.updated
provider.connection.created
provider.connection.error
provider.connection.updated
testkit.order.updated

