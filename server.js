const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle image upload and caption generation
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const userDescription = req.body.description;
        const filePath = req.file.path;

        console.log('Received Description:', userDescription);

        // Call OpenAI API to generate a caption
        const memeText = await generateCaption(userDescription);

        console.log('Generated Caption:', memeText);

        res.send({ filePath, memeText });
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).send({ error: 'Failed to generate meme text' });
    }
});

// Function to call OpenAI's chat/completions endpoint
async function generateCaption(description) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a funny meme caption generator.' },
                    { role: 'user', content: `Create a funny caption for an image described as: "${description}"` }
                ],
                max_tokens: 50,
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API Error:', error.response?.data || error.message);
        throw new Error('Failed to generate caption from OpenAI.');
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
