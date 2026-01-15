🍽️ AI-Recipe Generator Web App
A full-stack MERN (MongoDB, Express, React, Node.js) application that generates recipes based on the ingredients you have. Integrated with OpenAI API to provide AI-powered recipe suggestions.
Features

Generate recipes using AI-powered suggestions 🤖

Responsive UI built with React ⚛️

RESTful API with Node.js & Express 🚂

Optional MongoDB integration for storing recipes 🍃

Environment-based configuration for backend URL, port, and API keys 📝
💻 Tech Stack

Frontend: React.js ⚛️, Axios 📡, CSS 🎨

Backend: Node.js 🟢, Express.js 🚂

Database: MongoDB 🍃

AI Integration: OpenAI 🤖

Environment Config: .env 📝

Other Tools: CORS 🌐, Nodemon 🔄, Git 🐙
1️⃣ Clone the repository
git clone https://github.com/yourusername/recipe-generator.git
cd recipe-generator

2️⃣ Backend Setup
cd backend
npm install
# create a .env file
PORT=5000
DB_URL=mongodb://localhost:27017/recipe-generator
OPENAI_API_KEY=your_openai_api_key
npm start
3️⃣ Frontend Setup
cd frontend
npm install
# create a .env file
REACT_APP_API_URL=http://localhost:5000
npm start

4️⃣ Usage

Open http://localhost:3000
 in your browser.

Enter ingredients and click Generate Recipe.

Get AI-powered recipe suggestions from OpenAI.
Future Enhancements

User authentication & saved recipes

Mobile responsive UI improvements

More AI features like meal plans, nutritional info

Dockerized deployment
