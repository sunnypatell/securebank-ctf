# Project Overview — SQL Injections (CTF Design)

This outline captures the original design vision for an intentionally vulnerable banking/e‑commerce style application focused on SQL injection and related access‑control flaws. The live implementation currently uses Next.js App Router + SQLite; some details below (e.g., MongoDB) reflect early brainstorming and are preserved for completeness.

## Functional Scope

Core user flows
1. Login / Register
2. Make a transaction (purchase or transfer between users)
3. View transactions (with potential exploit paths to view all)
4. Leave feedback and comments

Technology notes
- Backend Framework: TBD (original); implemented with Next.js App Router
- Relational DB: SQLite — core functionality
- NoSQL: MongoDB for feedback/comments (original plan). Note: current app stores feedback in SQLite for simplicity.

## Attack Concepts (Draft to Challenges)

1) Registration attack (role escalation via INSERT)
- Flow: user supplies crafted password to alter `role` during registration
- Intended mitigation bypass: blacklist/filters on username; injection only via password
- Example payload concept: `winner', 'pass', CHAR(97,100,109,105,110)) --`

2) Login attack (UNION‑based or filter bypass)
- Goal: log in as a target user/admin
- Flow: public discussion hints; use imperfect sanitization with iterative payload refinement

3) Transaction search
- Goal: enumerate all users’ transactions via SQLi or logic bug

4) Overwrite all transactions
- Goal: destructive write via stacked queries or maintenance path

5) Manipulate comments (NoSQL)
- Goal: forge statements/announcements or pump likes to top content
- Variants: NoSQL DoS, like manipulation

Mapping to current repo
- Implemented challenges include registration role escalation, admin login bypass, feedback‑based escalation and credential exfiltration, and viewing all transactions. See `challenges/*` for authored briefs and writeups.

---

<details>
<summary><strong>Original Draft (Preserved)</strong></summary>

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
Flow
1. Web form to submit with username, password
2. In the backend,
INSERT INTO users (username, password, role)
VALUES ('$username', '$password', 'user');
3. By defualt role will be user, but we will break out of this and assign admin
4. Challenge solved by visiting /admin

Make sure to Hide the role field from the registration form to force SQL injection.
Add a blacklist of words on the username field, making the injection ONLY possible from the password field 

Example solution
winner', 'pass', CHAR(97,100,109,105,110)) --
Back end
INSERT INTO users (username, password, role)
VALUES ('winner', 'pass', CHAR(97,100,109,105,110)) --') Which decodes to admin


### 2. Login attack
Log into an account with a UNION Select attack ('-- / OR 1=1 will be sanitized)
Flow
1. The discussion board will be public, do not need to be logged in to see it
2. One of the users is of interest to us, we want to break in
3. We will use an imperfect sanitization filter (see discord) and will craft a query to get passed it. We also need to show error messages to burp so that an attacker can "figure out" how to do it and well show a sequence of maybe 3 attempts to get to the attack that works

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

</details>



