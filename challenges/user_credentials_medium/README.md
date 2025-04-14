# 🛡️ Challenge: Extract User Credentials via Feedback SQL Injection

**Author:** Robert Pianezza  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## 🎯 Objective

Use SQL injection to extract all usernames and passwords from the `Users` table by injecting a payload into the feedback form. The goal is to make those credentials appear as public feedback messages.

---

## 💻 Background

The `/dashboard/feedback` page lets logged-in users submit feedback that is stored in a database and displayed publicly.

You suspect that the input in the feedback form is being directly inserted into an SQL query. Strange behavior after submitting special characters like `'` and `);` confirms your suspicion. This may allow you to inject a second SQL command into the original query.

---

## 📍 Starting Point

Start here:  
🔗 `http://localhost:3000/dashboard/feedback`

Submit a regular message first. Then try injecting SQL payloads into the **message** field to break out of the SQL query and run a second one.

Your job is to:

- Craft a payload that breaks the SQL `INSERT` statement
- Insert a second `INSERT INTO ... SELECT` that dumps all usernames and passwords into the feedback list

> 🧠 Hint: Try to close the original `VALUES` clause and start a new query

---

## 🧪 Success Criteria

You’ve completed the challenge when:  
You can see multiple feedback messages containing **usernames and passwords** from the `Users` table — including accounts you did not create.

---

## 🔍 Hints

- Try breaking out of the string with something like `x'`
- You’ll likely need to supply values for the remaining fields
- Inject a second query using `INSERT INTO ... SELECT ...`
- Don’t forget to end your payload with `--` to comment out leftover SQL

> 💡 Pro Tip: If your message input feels too powerful, you're probably right.

---

## ✅ Rules

- ✅ You may use your logged-in user account
- ✅ You may try multiple payloads
- ✅ You may use tools like Burp Suite to test your input
- ❌ Do not modify cookies or access restricted routes directly

---

## 🏁 Tags

`SQL Injection` • `INSERT Injection` • `Data Exfiltration` • `Black-Box` • `Feedback System`

---

## 🧠 Final Note

This challenge is a demonstration of SQL injection through multi-statement execution. By carefully closing the original query and injecting a second one, you're able to leak sensitive data into a part of the app that displays user input.

All the best,  
\- Robert Pianezza
