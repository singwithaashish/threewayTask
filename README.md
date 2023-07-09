MERN Chat Dashboard is a web application that allows communication between a Manufacturer and a Transporter. This is achieved through a chat feature implemented with Socket.io. It provides a user-friendly interface with different input forms for each user type. The application is built using the MERN stack along with TypeScript and Socket.io.

Live URL: https://aquamarine-douhua-4e3759.netlify.app/login

test email `aaa@aaa.aaa`
test pw: `aaa@aaa.aaa`  for manufacturers


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)



## Features
- [x] User Registration and Authentication
- [x] Separate pages data for Manufacturer and Transporter
- [x] Chat based on Orders
- [x] Manufacturer input form with fields for Order ID, From, To, Quantity, Pickup - Address, and Transporter
- [x] Transporter can add their price on pending orders
- [x] Real-time chat feature between Manufacturer and Transporter using Socket.io


## Installation
1. Clone the repository
```
git clone https://github.com/singwithaashish/threewayTask
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



## Screenshots
![Screenshot from 2023-07-09 13-44-38](https://github.com/singwithaashish/threewayTask/assets/52033403/e5283bab-1570-4b10-aa8d-511eafd610ac)
![Screenshot from 2023-07-09 13-44-33](https://github.com/singwithaashish/threewayTask/assets/52033403/1ac9cd38-04ca-443c-a86b-aa060664955c)
![Screenshot from 2023-07-09 13-44-09](https://github.com/singwithaashish/threewayTask/assets/52033403/d88dbc19-aeea-45d7-8640-931206735d6b)
![Screenshot from 2023-07-09 13-43-26](https://github.com/singwithaashish/threewayTask/assets/52033403/1be65191-e122-4149-8c72-36c69480613f)
![Screenshot from 2023-07-09 13-42-30](https://github.com/singwithaashish/threewayTask/assets/52033403/ea4c9cf0-7d6e-4093-8af5-2e3ed4b445c4)



