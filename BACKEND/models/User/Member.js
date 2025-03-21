const router = require('express').Router();
const MemberModel = require('../../models/User/Member'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');



// Route for registering a new member
router.route('/register').post((req, res) => {
    const { name, email, password, number } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        MemberModel.findOne({ email: email })
            .then((existingUser) => {
                if (existingUser) {
                    res.status(400).json({ error: 'Email already registered' });
                } else {
                    MemberModel.create({ name, email, password: hash, number })
                        .then((newMember) => res.json(newMember))
                        .catch((err) => res.status(500).json({ error: err.message }));
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    });
});

// Route for logging in a member
router.route('/login').post((req, res) => {
  const { email, password } = req.body;
  MemberModel.findOne({ email: email })
      .then((user) => {
          if (user) {
              bcrypt.compare(password, user.password, (err, result) => {
                  if (err) {
                      res.json({ status: 'error', error: err.message });
                  } else {
                      if (result) {
                          const token = jwt.sign({ email: user.email }, 'jwt-secret-key', {
                              expiresIn: '1d',
                          });
                          res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
                          res.cookie('userEmail', user.email, { maxAge: 86400000 });
                          res.json({ status: 'success', userId: user._id, role: user.role, isAdmin: user.role === 'admin', isStaff: user.role === 'staff' });
                      } else {
                          res.status(401).json({ status: 'incorrect password' });
                      }
                  }
              });
          } else {
              res.status(404).json({ status: 'no record existed' });
          }
      })
      .catch((err) => {
          res.status(500).json({ status: 'error', error: err.message });
      });
});

// Route for getting all regular members (role: 'user')
router.route('/userdetails').get((req, res) => {
  MemberModel.find({ role: 'user' })
    .then((users) => {
      const userCount = users.length; 
      res.json({ users, userCount });
    })
    .catch((err) => res.status(500).json(err));
});

// Route for getting details of a member by ID
router.route('/getUser/:id').get((req, res) => {
  const id = req.params.id;
  MemberModel.findById(id)
    .then((user) => {
      if (user) {
        res.json(user); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Route for updating member details
router.put('/userupdate/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
    };

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedUserData.password = hashedPassword;
    }

    if (req.body.reenterPassword) {
      const hashedReenterPassword = await bcrypt.hash(req.body.reenterPassword, 10);
      updatedUserData.reenterPassword = hashedReenterPassword;
    }

    const updatedUser = await MemberModel.findByIdAndUpdate(id, updatedUserData, { new: true });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for deleting a member
router.route('/deleteUser/:id').delete((req, res) => {
  const id = req.params.id;
  MemberModel.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.json(user); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Route for generating a numeric OTP
function generateNumericOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Route for handling forgot password
router.route('/forgot-password').post((req, res) => {
  const { email } = req.body;

  MemberModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ status: 'User not found' });
      }

      const token = jwt.sign({ email: user.email }, 'jwt-secret-key', { expiresIn: '1h' });

      res.cookie('resetToken', token, { httpOnly: true, maxAge: 3600000 });
      res.cookie('userEmail', user.email, { maxAge: 3600000 });

      const otp = generateNumericOTP(6);

      user.otp = otp;
      user.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'denuwangunathilaka@gmail.com',
          pass: 'your-email-password', 
        },
      });

      const mailOptions = {
        from: 'denuwangunathilaka@gmail.com',
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send({ status: 'Error sending email' });
        } else {
          return res.status(200).send({ status: 'OTP sent successfully' });
        }
      });
    })
    .catch((error) => {
      return res.status(500).send({ status: 'Internal server error' });
    });
});

// Route for OTP verification
router.route('/verify-otp').post(async (req, res) => {
  const { otp, userEmail } = req.body;

  try {
    const user = await MemberModel.findOne({ email: userEmail });

    if (!user) {
      return res.send({ status: "Incorrect OTP" });
    }

    if (user.otp !== otp) {
      return res.send({ status: "Incorrect OTP" });
    }

    user.otp = null;
    await user.save();

    return res.send({ status: "Success" });

  } catch (error) {
    return res.status(500).send({ status: "Error processing request" });
  }
});

// Route for resetting password
router.route('/reset-password').post(async (req, res) => {
  const { Password, userEmail } = req.body;
  try {
    if (!Password) {
      return res.status(400).send({ status: 'Error resetting password', message: 'Password field is required' });
    }

    const user = await MemberModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ status: 'Error resetting password', message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.send({ status: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'Error resetting password', message: error.message });
  }
});

// Route for updating member account details
router.route('/AccountDetails').post((req, res) => {
  const { name, email, number, userEmail, userId } = req.body;

  MemberModel.findOneAndUpdate({ _id: userId }, { name, email, number, userId }, { new: true })
      .then(updatedUser => {
          res.json({ status: 'success', updatedUser });
      })
      .catch(error => {
          res.status(500).json({ status: 'error', error: error.message });
      });
});

// Route for getting member details by userId
router.get('/getUsers/:userId', (req, res) => {
  const userId = req.params.userId;
  MemberModel.findOne({ _id: userId })
      .then((user) => {
          if (user) {
              res.json(user); 
          } else {
              res.status(404).json({ error: 'User not found' });
          }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
});

// File upload setup
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/path-to-your-folder'); 
  },
  filename:  (req, file, cb)=> {
    cb(null,  file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route for uploading member images
router.post('/upload-image', upload.single('file'), async (req, res) => {
  const userEmail = req.body.email;

  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
      const user = await MemberModel.findOne({ email: userEmail });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.image = req.file.path;
      await user.save();

      res.json({ status: 'success', message: 'Image uploaded successfully', imagePath: req.file.path });
  } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

module.exports = router;
