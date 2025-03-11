# Project overview - SQL Injections

## Theme and functionalities

Some sort of Ecommerce or Banking application with the following functionalites
1. Login / Register
2. Make a transaction (either a purchase or money transfer between 2 users)
3. View their transactions (could exploit this to view all transactions)
4. Leave feedback and comments

## Technologies to be used

Backend Framework: TBD
Relational Database: Sqlite3 - Used for core functionality
NoSQL Database: MongoDB - Used to handle feedback and comments

## Types of attacks

### 1. Registration attack 
Register a user using an INSERT Query and give them some kind of role (admin, support, etc)

### 2. Login attack
Log into an account with a UNION Select attack ('-- / OR 1=1 will be sanitized)

### 3. Transaction search
See EVERYONE's transactions 

### 4. Overwrite ALL transactions
The goal here is to cause mayhem

### 5. Manipulate comments (NoSQL)
Make someone say something they didnt say, maybe change or create an admins announcement telling users to buy a crypto coin that you are gonna rugpull

Other possible attacks

### 6. NoSQL DOS
This one is very similar to a Juice Shop challenge so wouldnt be worth much

### NoSQL Like manipulation
Create a post/comment with 100 likes, sending it to the top of the list



