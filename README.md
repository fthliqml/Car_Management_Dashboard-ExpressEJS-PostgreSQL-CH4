# Car Management System

![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-F06C00?style=for-the-badge)

A simple web-based car management system that allows users to add, update, and delete car data. This project leverages several modern technologies including Express, Sequelize ORM, and PostgreSQL for database management, with Bootstrap for the front-end interface and ImageKit for image uploads.

## Features

- View all cars in a dashboard format with detailed cards for each car.
- Filter cars by size (small, medium, large).
- Add new car data, including the option to upload a car image.
- Edit car data and optionally change the car image.
- Delete car data directly from the dashboard.
- Success alerts after creating, updating, or deleting data (using flash and express-session).
- Front-end and back-end validation for image uploads (only `png` or `jpg` files are allowed).
- Upload images to ImageKit with URLs stored in the PostgreSQL database.

## Project Structure

```bash
.
├── config/
├── lib/
├── controller/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── views/
├── public/
├── app.js
├── .env
└── README.md
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js installed on your machine
- PostgreSQL database
- ImageKit account for handling image uploads

### Installation

1. Clone the repository :

   ```bash
   git clone https://github.com/fthliqml/Car_Management_Dashboard-ExpressEJS-PostgreSQL-CH4
   cd car-management-system
   ```

2. Install Dependencies :

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory and add the following :

   ```bash
   DATABASE_URL=your_postgresql_database_url
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. Run migrations to set up the database schema :

   ```bash
   npx sequelize db:migrate
   ```

5. Start the server :

   ```bash
   npm start
   ```

## Routes

- **GET** `/cars`: View all cars in the dashboard.
- **GET** `/cars/:id`: Retrieve car data for editing.
- **DELETE** `/cars/:id`: Delete a car from the dashboard.
- **POST** `/cars/add`: Add new car data, including an image.
- **PATCH** `/cars/:id/edit`: Update car data, including replacing the image (optional).

## Usage

1. Navigate to the dashboard (`/cars`) to view all cars.
2. Use the "Add Car" button to go to the form for adding a new car.
3. Edit a car by clicking the "Edit" button on a car card, or delete a car using the "Delete" button.
4. Filter the dashboard by car size to quickly find specific cars.

## Screenshot / Demo

### Dashboard View :

A visual of the car dashboard showing all cars.

![Dashboard](https://github.com/user-attachments/assets/32f96627-b6dc-4f42-90ff-8a3c9dfce2a5)

### Add Car Form :

A demo of adding a new car.

![Add car](https://github.com/user-attachments/assets/6465e356-44b2-4404-9418-89aa1c3f0ecc)

### Edit Car Form :

Editing an existing car's data and optionally changing its image.

![Edit car](https://github.com/user-attachments/assets/d3113305-25f2-4a95-a850-98f8f6e5a0cb)

### Delete Car :

Deleting a car from the dashboard.

![delete car](https://github.com/user-attachments/assets/2c23d22d-bb02-4681-9fb6-201fabfdbf9d)
