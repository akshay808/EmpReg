const express = require('express');
const auth = require('../middleware/auth_for_employees');
const Emp = require('../models/emp');
const router = new express.Router();

router.post('/employee_registration', async (req, res) => {
  const emp = new Emp(req.body);
  try {
    await emp.save();
    const token = await emp.generateAuthToken();
    res.status(201).send({ emp, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/employee/login', async (req, res) => {
  try {
    const emp = await Emp.findByCredentials(req.body.email, req.body.password);
    const token = await emp.generateAuthToken();
    res.send({ emp, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/emp/me', auth, async (req, res) => {
  res.send(req.emp);
});

// router.get('/emp', auth, async (req, res) => {
//   try {
//     const emps = await Emp.find({});
//     res.send(emps);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.patch('/emp/:id', async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['project', 'reportlead', 'projectMan'];
//   const isValidOperation = updates.every(update =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }

//   try {
//     const emp = await Emp.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!emp) {
//       return res.status(404).send();
//     }

//     res.send(emp);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
