# One Status

### Before you begin
```
# Clone the repo
cd <PATH TO REPO>

# Create environment variables 
touch .env
```
##### Make sure to include at least the following within your .env file
```
PORT=5000
DATABASE=mydatabase
DATABASE_USER=postgres
DATABASE_PASSWORD=password
```
> Note: you must have a database matching the name above already created. 
If not open up psql and run `CREATE DATABASE mydatabase;`


### Quick Start
```
# On one terminal
cd client
yarn
yarn start 

# On a second terminal
cd server
yarn
yarn start
```
> Note: a little data will be automatically populate the database when you start the server. Make sure you have a psql server running. 

### View application
The application can be viewed at [localhost:3000](http://localhost:3000)

### Future improvements
* strict validation (possibly [validatejs](https://validatejs.org/))
* state management
* auth / tweet history 
* styling updates