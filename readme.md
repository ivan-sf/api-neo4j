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








































<select name="eventType" id="eventType" class="chakra-select css-5jvtxk" aria-describedby="eventType-helptext"><option disabled="" value="">Select an event type</option>
<optgroup label="Subscribed events"><option value="historical.data.heartrate.created">historical.data.heartrate.created</option>
<option value="historical.data.ige.created">historical.data.ige.created</option>
<option value="daily.data.sleep.updated">daily.data.sleep.updated</option>
<option value="daily.data.meals.created">daily.data.meals.created</option>
<option value="daily.data.body.updated">daily.data.body.updated</option>
<option value="daily.data.meals.updated">daily.data.meals.updated</option>
<option value="daily.data.blood_pressure.created">daily.data.blood_pressure.created</option>
<option value="daily.data.water.updated">daily.data.water.updated</option>
<option value="daily.data.meal.created">daily.data.meal.created</option>
<option value="daily.data.glucose.created">daily.data.glucose.created</option>
<option value="daily.data.water.created">daily.data.water.created</option>
<option value="historical.data.body.created">historical.data.body.created</option>
<option value="daily.data.device.created">daily.data.device.created</option>
<option value="daily.data.igg.created">daily.data.igg.created</option>
<option value="daily.data.workouts.created">daily.data.workouts.created</option>
<option value="historical.data.activity.created">historical.data.activity.created</option>
<option value="daily.data.fat.created">daily.data.fat.created</option>
<option value="daily.data.sleep.created">daily.data.sleep.created</option>
<option value="daily.data.activity.updated">daily.data.activity.updated</option>
<option value="daily.data.fat.updated">daily.data.fat.updated</option>
<option value="daily.data.device.updated">daily.data.device.updated</option>
<option value="historical.data.workouts.created">historical.data.workouts.created</option>
<option value="daily.data.weight.created">daily.data.weight.created</option>
<option value="daily.data.blood_oxygen.updated">daily.data.blood_oxygen.updated</option>
<option value="daily.data.workout_stream.created">daily.data.workout_stream.created</option>
<option value="daily.data.heartrate.created">daily.data.heartrate.created</option>
<option value="daily.data.ige.updated">daily.data.ige.updated</option>
<option value="daily.data.igg.updated">daily.data.igg.updated</option>
<option value="historical.data.sleep.created">historical.data.sleep.created</option>
<option value="historical.data.fat.created">historical.data.fat.created</option>
<option value="daily.data.activity.created">daily.data.activity.created</option>
<option value="historical.data.hrv.created">historical.data.hrv.created</option>
<option value="daily.data.hrv.created">daily.data.hrv.created</option>
<option value="daily.data.glucose.updated">daily.data.glucose.updated</option>
<option value="historical.data.blood_oxygen.created">historical.data.blood_oxygen.created</option>
<option value="daily.data.workouts.updated">daily.data.workouts.updated</option>
<option value="daily.data.heartrate.updated">daily.data.heartrate.updated</option>
<option value="historical.data.meals.created">historical.data.meals.created</option>
<option value="historical.data.blood_pressure.created">historical.data.blood_pressure.created</option>
<option value="daily.data.blood_pressure.updated">daily.data.blood_pressure.updated</option>
<option value="historical.data.weight.created">historical.data.weight.created</option>
<option value="daily.data.meal.updated">daily.data.meal.updated</option>
<option value="historical.data.device.created">historical.data.device.created</option>
<option value="historical.data.meal.created">historical.data.meal.created</option>
<option value="historical.data.igg.created">historical.data.igg.created</option>
<option value="daily.data.blood_oxygen.created">daily.data.blood_oxygen.created</option>
<option value="historical.data.profile.created">historical.data.profile.created</option>
<option value="daily.data.weight.updated">daily.data.weight.updated</option>
<option value="daily.data.ige.created">daily.data.ige.created</option>
<option value="daily.data.hrv.updated">daily.data.hrv.updated</option>
<option value="daily.workout_stream.unavailable">daily.workout_stream.unavailable</option>
<option value="daily.data.body.created">daily.data.body.created</option>
<option value="daily.workout_stream.created">daily.workout_stream.created</option>
<option value="historical.data.glucose.created">historical.data.glucose.created</option>
</optgroup><optgroup label="Other"><option value="daily.data.active_energy_burned.created">daily.data.active_energy_burned.created</option>
<option value="daily.data.active_energy_burned.updated">daily.data.active_energy_burned.updated</option>
<option value="daily.data.basal_energy_burned.created">daily.data.basal_energy_burned.created</option>
<option value="daily.data.basal_energy_burned.updated">daily.data.basal_energy_burned.updated</option>
<option value="daily.data.caffeine.created">daily.data.caffeine.created</option>
<option value="daily.data.caffeine.updated">daily.data.caffeine.updated</option>
<option value="daily.data.distance_running_walking.created">daily.data.distance_running_walking.created</option>
<option value="daily.data.distance_running_walking.updated">daily.data.distance_running_walking.updated</option>
<option value="daily.data.floors_climbed.created">daily.data.floors_climbed.created</option>
<option value="daily.data.floors_climbed.updated">daily.data.floors_climbed.updated</option>
<option value="daily.data.hypnogram.created">daily.data.hypnogram.created</option>
<option value="daily.data.hypnogram.updated">daily.data.hypnogram.updated</option>
<option value="daily.data.mindfulness_minutes.created">daily.data.mindfulness_minutes.created</option>
<option value="daily.data.mindfulness_minutes.updated">daily.data.mindfulness_minutes.updated</option>
<option value="daily.data.respiratory_rate.created">daily.data.respiratory_rate.created</option>
<option value="daily.data.respiratory_rate.updated">daily.data.respiratory_rate.updated</option>
<option value="daily.data.vo2_max.created">daily.data.vo2_max.created</option>
<option value="daily.data.vo2_max.updated">daily.data.vo2_max.updated</option>
<option value="historical.data.active_energy_burned.created">historical.data.active_energy_burned.created</option>
<option value="historical.data.basal_energy_burned.created">historical.data.basal_energy_burned.created</option>
<option value="historical.data.caffeine.created">historical.data.caffeine.created</option>
<option value="historical.data.distance_running_walking.created">historical.data.distance_running_walking.created</option>
<option value="historical.data.floors_climbed.created">historical.data.floors_climbed.created</option>
<option value="historical.data.hypnogram.created">historical.data.hypnogram.created</option>
<option value="historical.data.mindfulness_minutes.created">historical.data.mindfulness_minutes.created</option>
<option value="historical.data.respiratory_rate.created">historical.data.respiratory_rate.created</option>
<option value="historical.data.vo2_max.created">historical.data.vo2_max.created</option>
<option value="historical.data.water.created">historical.data.water.created</option>
<option value="labtest.order.created">labtest.order.created</option>
<option value="labtest.order.updated">labtest.order.updated</option>
<option value="provider.connection.created">provider.connection.created</option>
<option value="provider.connection.error">provider.connection.error</option>
<option value="provider.connection.updated">provider.connection.updated</option>
<option value="testkit.order.updated">testkit.order.updated</option>
</optgroup></select>