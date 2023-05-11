const express = require('express');
const VitalService = require('../services/VitalService');

const router = express.Router();
const vitalService = new VitalService();

router.post('/', async (req, res) => {
  try {
    const eventType = req.body.event_type
    let dataCypher = ''
    let nameNodeEvent = ''
    if(eventType === "daily.data.activity.created" || eventType === "daily.data.activity.updated"){
      dataCypher = req.body;
      nameNodeEvent = "Activity";
    }
    const saveData = await vitalService.saveData(dataCypher,eventType,nameNodeEvent,req.body);
    return res.status(201).json({ message: 'data_vital creada exitosamente', saveData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
});

module.exports = router;
