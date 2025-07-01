require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Routes = require('./routes/Routes');
const authRoutes = require('./routes/authRoutes');
app.use(cors());
app.use(express.json());
app.use('/api', Routes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
