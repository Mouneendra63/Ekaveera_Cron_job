const cron = require('node-cron');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/fetch-today-appointments`);
    const appointments = response.data;
    const today = new Date().toISOString().split('T')[0];

    console.log(`\nAppointments for: ${today}\n`);

    const extracted = appointments.map(a => ({
      name: a.name,
      phno: a.phno,
      sex: a.sex,
      age: a.age,
      date: today
    }));

    console.table(extracted);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to fetch appointments:`, error.message);
  }
};

cron.schedule('0 0 * * *', fetchAppointments, {
  timezone: 'Asia/Kolkata',
});

fetchAppointments();