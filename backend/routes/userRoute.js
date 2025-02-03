const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  getStudents,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');
const protection = require('../middleware/authMiddleware');
// const auth = require('../middleware/authMiddleware');

// const registerUser = () => {}

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getuser', protection.protect, getUser);
router.get('/getstudents', getStudents);
router.get('/loggedin', loginStatus);
router.patch('/updateuser', protection.protect , updateUser);
router.patch('/changepassword',  changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
