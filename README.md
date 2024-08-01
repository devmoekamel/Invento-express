# Trading API

This is a Trading API built using Node.js, Express.js, JWT, and Mongoose.

## Project Structure

```
trading-api/
├── config/
│   ├── db.js
│   └── config.env
├── controllers/
│   ├── user.js
│   ├── stock.js
│   ├── offer.js
│   └── transaction.js
├── middleware/
│   └── Authentication.js
├── models/
│   ├── user.js
│   ├── stock.js
│   ├── offer.js
│   └── transaction.js
├── routes/
│   ├── user.js
│   ├── stock.js
│   ├── offer.js
│   └── transaction.js
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Installation


2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `config.env` file in the `config` directory with the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm start
   ```

## Endpoints

### User

- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: Login a user

### Stock

- **GET /api/stocks**: Get all stocks
- **GET /api/stocks/:id**: Get a single stock
- **POST /api/stocks**: Create a new stock
- **PUT /api/stocks/:id**: Update a stock
- **DELETE /api/stocks/:id**: Delete a stock

### Offer

- **GET /api/offers**: Get all offers
- **GET /api/offers/:id**: Get a single offer
- **POST /api/offers**: Create a new offer
- **PUT /api/offers/:id**: Update an offer
- **DELETE /api/offers/:id**: Delete an offer

### Transaction

- **GET /api/transactions**: Get all transactions
- **GET /api/transactions/:id**: Get a single transaction
- **POST /api/transactions**: Create a new transaction
- **PUT /api/transactions/:id**: Update a transaction
- **DELETE /api/transactions/:id**: Delete a transaction

## Middleware

- **Authentication.js**: Middleware to protect routes and ensure the user is authenticated

## Models

- **user.js**: User model
- **stock.js**: Stock model
- **offer.js**: Offer model
- **transaction.js**: Transaction model

## Configuration

- **db.js**: MongoDB connection configuration
- **config.env**: Environment variables

## Running Tests

To run tests, use the following command:
```sh
npm start
```
