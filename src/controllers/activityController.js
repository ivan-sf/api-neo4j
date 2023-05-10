const express = require('express');
const VitalActivityService = require('../services/VitalActivityService');

const router = express.Router();
const vitalActivityService = new VitalActivityService();

router.post('/activity', async (req, res) => {
  try {
    const activity = await vitalActivityService.activity(req.body,req.body.event_type);
    return res.status(201).json({ message: 'activity creada exitosamente', activity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
});

module.exports = router;
