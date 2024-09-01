const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();



app.use(cors());
app.use(express.json());

const chatbotRoutes = require('./routes/chatbotRoutes');

app.get('/', (req, res) => {
    res.send('Backend is function 👨‍🍳🍽');
});

app.use('/api/chatbot', chatbotRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});