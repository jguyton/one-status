### Before you begin
```
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
