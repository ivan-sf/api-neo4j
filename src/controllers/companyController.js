const express = require('express');
const CompanyService = require('../services/CompanyService');

const router = express.Router();
const companyService = new CompanyService();

router.post('/', async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    return res.status(201).json({ message: 'Empresa creada exitosamente', company });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
});

module.exports = router;
