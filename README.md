# Meme Generator

A web-based **Meme Generator** application that allows users to upload an image, add a custom caption, and download the generated meme. The project dynamically adjusts the canvas size and ensures images and captions fit perfectly without distortion.

## Features

- Upload any image to create a meme.
- Add custom text descriptions to generate captions.
- Dynamically resizes images to fit within `350x350` dimensions while maintaining aspect ratio.
- Automatically adjusts canvas size for long captions.
- Reset functionality to clear the canvas and start over.
- Download the generated meme as a PNG file.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Caption Generation**: OpenAI's GPT-3.5 API (integrated to generate captions based on descriptions)
- **Deployment**: Render

## Live Demo

You can view the live version of the project here: [Meme Generator](https://meme-generator-onk7.onrender.com)

## How It Works

1. Upload an image using the **Upload Image** button.
2. Enter a description for the image.
3. Click on the **Generate Meme** button to create the meme.
4. The generated meme, along with the caption, will appear on the canvas.
5. Click **Download Meme** to save it locally.
6. Use the **Reset** button to clear the canvas and start over.

## Installation and Setup

To run this project locally:

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/meme-generator.git
cd meme-generator

# Install dependencies
npm install

# Create a .env file and add your OpenAI API key
echo "OPENAI_API_KEY=your_openai_api_key" > .env

# Start the server
node server.js
\`\`\`

Once the server is running, open your browser and navigate to:

\`\`\`plaintext
http://localhost:5000
\`\`\`

## Directory Structure

\`\`\`plaintext
meme-generator/
├── public/
│   ├── index.html    # Main HTML file
│   ├── styles.css    # CSS styling (if externalized)
│   └── script.js     # JavaScript functionality (if externalized)
├── uploads/          # Directory for uploaded images
├── server.js         # Backend server
├── .env              # Environment variables (API keys, etc.)
└── README.md         # Project documentation
\`\`\`

## API Integration

This project integrates OpenAI's GPT-3.5 for caption generation:

- Sends the image description to OpenAI's API.
- Receives and displays a caption for the meme.

Example API usage in server.js:

\`\`\`javascript
const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a funny meme caption generator.' },
            { role: 'user', content: \`Create a funny caption for an image described as: "\${description}"\` }
        ],
        max_tokens: 50,
        temperature: 0.7
    },
    {
        headers: {
            Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
            'Content-Type': 'application/json'
        }
    }
);
\`\`\`

## Example JavaScript Functionality

Example of dynamically resizing the image to fit within 350x350 dimensions:

\`\`\`javascript
const maxWidth = 350; // Maximum width for the image
const maxHeight = 350; // Maximum height for the image
const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height, 1); // Scale proportionally

canvas.width = img.width * scaleFactor;
canvas.height = img.height * scaleFactor;
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
\`\`\`

## Contributing

Contributions are welcome! If you'd like to improve this project, feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License.

## Author

Your Name  
Your GitHub Profile  
Your Portfolio
