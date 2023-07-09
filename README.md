MERN Chat Dashboard is a web application that allows communication between a Manufacturer and a Transporter. This is achieved through a chat feature implemented with Socket.io. It provides a user-friendly interface with different input forms for each user type. The application is built using the MERN stack along with TypeScript and Socket.io.


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)



## Features
- [x] User Registration and Authentication
- [x] Separate landing pages for Manufacturer and Transporter
- [x] Chat based on Orders
- [x] Manufacturer input form with fields for Order ID, From, To, Quantity, Pickup - Address, and Transporter
- [x] Transporter input form with fields for Order ID and Price
- [x] Real-time chat feature between Manufacturer and Transporter using Socket.io


## Installation
1. Clone the repository
```
git clone
```

2. Install dependencies
```
cd client
npm install

cd server
npm install
```

3. Add a .env file in the server folder with the following variables
```
MONGO_URI=<your_mongoDB_Atlas_uri_with_credentials>
JWT_SECRET=<your_secret_key>
```

4. Run the application
```
cd client
npm run dev
 
cd server
npm run start
```



## Technologies
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)





