# 🛡️ Challenge: Login as Admin via Double-Encoded Injection  
**Author:** Daniyal Abbas Lilani.  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## Objective

Bypass login authentication and gain access to the **admin account** which may or may not be the **first account** in the database using a cleverly crafted SQL Injection payload. 
---

## Background

You register, log in, and get a role of `user`. But something's fishy — the app clearly distinguishes between roles... 

Attempts to inject classic SQL payloads are blocked by some input filtering. The server’s response to your fishy behavior gives a detailed error message hints that SQL keywords are being caught, but who says this filter is perfect?

---

## Starting Point

Start here:  
🔗 `http://localhost:3000/login`

Register an account with any username/password combo. After that, try logging in with payloads instead of real credentials.

Your job is to:
- Trick the SQL query into returning **the first user in the database**, which is likely the admin.
- Bypass client-side and server-side filters using **URL encoding**, possibly more than once

> 🧠 Hint: Your input is concatenated directly into a `SELECT` statement. Massive security issue. 

---

## You have successfully completed the challenge when

You are logged in and issued a session/cookie as the **admin**.

You have the ability to delete feedbacks (only admins can do this)

---

## Hints

- You can use tools like [urlencoder.org](https://www.urlencoder.org/) to encode payloads step-by-step.
- If `--` is blocked, try bypassing it using `/*` or other comment styles... and **encode** those too.

> 🧠 Remember, most web apps decode inputs **once** before evaluating them. What happens if you encode something **twice**?

---

## Rules

- ✅ You may register a new user  
- ✅ You may use tools like Burp Suite to intercept and modify requests    
- ❌ Do not tamper with cookies manually   

---

## Tags

`SQL Injection` • `Double Encoding` • `Access Control` • `Black-Box` • `Authentication Bypass`

---


Good luck hacker!  
\- Daniyal Abbas Lilani.
