const express = require('express');
const UserService = require('../services/UserService');

const router = express.Router();
const userService = new UserService();

router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    let response
    typeof(updatedUser) === 'object' 
      ? response = res.json({ message: 'Usuario actualizado exitosamente', user: updatedUser })
      : response = res.json({ message: 'Error al actualizar', error: updatedUser })
    return response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userService.deleteUser(id);
    return res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userService.findByVitalKeyUser(id);
    console.log("findUser",findUser)
    return res.json({ message: 'Ok', user: findUser})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud'});
  }
});


router.post('/activity', async (req, res) => {
  try {
    const user = await userService.activity(req.body,'daily.data.activity.updated');
    return res.status(201).json({ message: 'activity creada exitosamente', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
});

module.exports = router;
