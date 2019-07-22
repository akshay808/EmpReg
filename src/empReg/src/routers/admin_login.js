const express = require('express');
const Admin = require('../models/admin_login');
const auth = require('../middleware/auth_for_admin');
const Emp = require('../models/emp');
const router = new express.Router();
const Project = require('../models/project');

// router.post('/admin', async (req, res) => {
//   const emp = new Admin(req.body);
//   try {
//     await emp.save();
//     const token = await emp.generateAuthToken();
//     res.status(201).send({ emp, token });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.post('/admin/login', async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/show_all_employees', auth, async (req, res) => {
  try {
    const emps = await Emp.find({});
    res.send(emps);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/show_employees', auth, async (req, res) => {
  try {
    const emps = await Emp.find({
      project: req.body.project,
      reportlead: req.body.reportlead
    });
    res.send(emps);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/show_projects', auth, async (req, res) => {
  try {
    const emps = await Project.find({});
    res.send(emps);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/assign_project/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['project', 'reportlead', 'projectMan'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const emp = await Emp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!emp) {
      return res.status(404).send();
    }

    res.send(emp);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
