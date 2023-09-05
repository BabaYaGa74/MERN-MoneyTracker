# MERN Money Tracker

A simple money tracker application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to input transactions with a combined amount-name field, date and time of transaction, and a short description. The recorded transactions are displayed on the same page, and users can easily delete any of them.

![App Screenshot](src/assets/screenshot1)
![App Screenshot](src/assets/screenshot2)

## Features

- Add new transactions with:
  - Combined amount-name field (e.g., `+100 Grocery`)
  - Date and time
  - Short description
- Display all transactions on the main page
- Delete individual transactions

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/BabaYaGa74/MERN-MoneyTracker.git
```

2. Navigate into the directory:

```bash
cd MERN-MoneyTracker
```

3. Install all dependencies:

```bash
yarn install
```

### Running the App

1. Start the backend server:

```bash
yarn run server 
```

2. In another terminal, start the frontend server:

```bash
yarn start
```

The app should now be running on `http://localhost:4000/`.

### Environment Variables

Make sure to set up your `.env` file in the root directory with the following:

```env
MONGO_URI=your_mongodb_uri
```

Replace `your_mongodb_uri` with your actual MongoDB connection string.
