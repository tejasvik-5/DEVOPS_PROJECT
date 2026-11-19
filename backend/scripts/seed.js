const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const { StallData, ADMIN_IDS } = require('../../js/data');

const Stall = require('../models/Stall');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB for seeding.');

    const stalls = StallData.stalls || [];

    console.log('Stalls found in data.js:', stalls.length);

    for (const stall of stalls) {
      await Stall.findOneAndUpdate(
        { stallId: stall.id },
        {
          stallId: stall.id,
          name: stall.name,
          category: Array.isArray(stall.category)
            ? stall.category.join(', ')
            : (stall.category || ''),
          image: stall.image || stall.foodImage || '',
          prepTime: Number(stall.avgPrepTime) || 0,
          isOpen: true
        },
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );

      const menu = stall.menu || {};
      const categories = Object.keys(menu);

      for (const category of categories) {
        const items = menu[category] || [];

        for (const item of items) {
          await MenuItem.findOneAndUpdate(
            { itemId: item.id },
            {
              itemId: item.id,
              stallId: stall.id,
              name: item.name,
              category: category,
              price: Number(item.price) || 0,
              veg: item.veg !== false,
              prepTime: Number(item.prepTime) || 0,
              available: item.available !== false
            },
            {
              upsert: true,
              new: true,
              runValidators: true
            }
          );
        }
      }
    }

    const adminIds = Object.keys(ADMIN_IDS || {});

    for (const adminId of adminIds) {
      const admin = ADMIN_IDS[adminId];

      await User.findOneAndUpdate(
        { userId: adminId },
        {
          userId: adminId,
          name: admin.name || adminId,
          role: 'admin',
          stallId: admin.stallId || null,
          active: true
        },
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );
    }

    const stallCount = await Stall.countDocuments();
    const menuCount = await MenuItem.countDocuments();
    const userCount = await User.countDocuments();

    console.log('');
    console.log('Seed completed successfully.');
    console.log('Stalls:', stallCount);
    console.log('Menu items:', menuCount);
    console.log('Users:', userCount);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();