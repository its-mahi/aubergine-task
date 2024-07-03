const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/universities', async (req, res) => {
    const { country } = req.query;
    try {
        const url = `http://universities.hipolabs.com/search?country=${country}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
