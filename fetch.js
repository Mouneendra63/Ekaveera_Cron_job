const cron = require('node-cron');
const fetchAppointments = require('./fetchAppointments');

// Schedule the task to run every day at 12:10 AM
cron.schedule('10 0 * * *', () => {
  console.log(`[${new Date().toISOString()}] Running fetchAppointments...`);
  fetchAppointments();
});

// Keep the process running
console.log('Cron job started');