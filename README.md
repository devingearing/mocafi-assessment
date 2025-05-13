# MoCAFI Assessment Project

A TypeScript-based Express API using TSOA for API documentation and MongoDB for data storage. This project implements a user management system with credit card balance checking functionality.

    
    Once built go to the endpoint 'http://localhost:3000/docs' for the TSOA endpoints

## Features

- RESTful API built with Express and TypeScript
- TSOA implementation for route generation and API documentation 
- Swagger UI for interactive API exploration
- MongoDB integration with Mongoose
- Material Design UI for the frontend
- Credit card balance checking functionality

## Technologies Used

- Node.js & Express
- TypeScript
- TSOA for API documentation and route generation
- MongoDB with Mongoose
- Materialize CSS used for frontend with jQuery



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mocafi-assessment.git
   cd mocafi-assessment

2. Install dependencies:
    ```bash
    npm install


3. Set up MongoDB:
    Make sure MongoDB is running locally, or
    Update the MongoDB connection string in src/index.ts with your MongoDB URI

4. To Run you can use the macro command
    ```bash
   npm run build:run
   


## Explanation
I had multiple questions which I tried to make assertions to that dictated certain choices.

1. Can Users just enter a number to get a balance?
   ```text
   I assumed for simplicity that yes given the number they can get the return balance. If I had more scope I would have 
   recommended they need the CC# expiration and pin

2. Does location factor into play?
    ```text
   For simplicity I assumed no but idelly we would want to also capture the country code for the number in addition to currency
   
3. How does the expiration date affect the flow?
    ```text
   Currently expiration has no impact but I could see the account either being dectivated requiring steps to update or if this
   is a 'gift card' scenario it would be use it or lose it meaning the balance for expired cards would show zero. For book keeping 
   we would need another prop potentially so we could indicate avaliable balance and actual balance


## Retro

There are multiple things left out especially, validation and encryption. I would want to have no sensitive data stored as plaintext. Feilds such as CC can use an algo to check validity. I also left logic in the controllers for time's sake but should be abstracted out to a Facade.
   