# Challenge: SQL Injection in Feedback Form

**Challenge Created By:** Robert Pianezza  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## Objective

Find a way to extract all usernames and passwords from the `Users` table by injecting into the feedback form. Your goal is to make these credentials show up in the public feedback list.

---

## Where to Start

Go to:  
🔗 `http://localhost:3000/dashboard/feedback`

Start by:

- Logging in with any regular user account
- Submitting a normal message to see how it behaves
- Testing inputs that include symbols like `'` or `);` and checking for any errors or odd behavior

---

## What to Look For

The feedback form stores your message in the database.

If your input goes into the `message` field, you might be able to:

- Close the open string
- Finish the rest of the query
- Inject a new SQL command
- Use `--` to comment out leftover SQL

---

## When You’ve Solved It

You’ve completed the challenge when:

- You see feedback entries showing real usernames and passwords from the `Users` table
- These accounts were not created by you
- The page still works without crashing

---

## Hints

- Try using a single `'` to see how the app responds
- Think about how your input fits into a full SQL statement
- Don’t forget to comment out the rest of the original query

> 💡 Hint: If it feels too powerful, you're on the right track ;)

---

## Rules

- ✅ You can use your own account
- ✅ You can test with Burp Suite
- ❌ Don’t change any cookies (they're signed so you can't anyway)

---

## Final Note

This challenge shows how unsafe input handling can lead to a full data leak. By injecting into a simple feedback form, you can expose private user info without needing admin access.
