const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const adminPasswords = {
  'admin-maximus': process.env.ADMIN_MAXIMUS_PASSWORD,
  'admin-dosa': process.env.ADMIN_DOSA_PASSWORD,
  'admin-appetite': process.env.ADMIN_APPETITE_PASSWORD,
  'admin-annapurna': process.env.ADMIN_ANNAPURNA_PASSWORD,
  'admin-burger': process.env.ADMIN_BURGER_PASSWORD,
  'admin-dominos': process.env.ADMIN_DOMINOS_PASSWORD,
  'admin-cafefrisco': process.env.ADMIN_CAFEFRISCO_PASSWORD,
  'admin-chaigaram': process.env.ADMIN_CHAIGARAM_PASSWORD
};

async function setAdminPasswords() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured.');
    }

    const missingPasswords = Object.keys(adminPasswords).filter(
      function (adminId) {
        return !adminPasswords[adminId];
      }
    );

    if (missingPasswords.length > 0) {
      throw new Error(
        'Missing passwords for: ' + missingPasswords.join(', ')
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB.');

    const adminIds = Object.keys(adminPasswords);

    for (const adminId of adminIds) {
      const passwordHash = await bcrypt.hash(
        adminPasswords[adminId],
        12
      );

      const result = await User.updateOne(
        {
          userId: adminId,
          role: 'admin'
        },
        {
          $set: {
            passwordHash: passwordHash
          }
        }
      );

      if (result.matchedCount === 0) {
        console.warn('Admin not found: ' + adminId);
      } else {
        console.log('Password configured for ' + adminId);
      }
    }

    console.log('Admin password setup completed.');
  } catch (error) {
    console.error(
      'Unable to configure admin passwords:',
      error.message
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

setAdminPasswords();