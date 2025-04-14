# 🛡️ Challenge: Privilege Escalation via Feedback Injection  
**Author:** Sunny Patel – 100867748  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## 🎯 Objective

Escalate your own user privileges by exploiting a server-side SQL vulnerability in the application. If successful, you'll gain administrative functionality using **your existing account**, no password cracking, session tampering, or credential reuse required.

---

## 💻 Background

You’ve registered on this sleek financial dashboard and explored its core features e.g., transactions, feedback, dashboard... all pretty standard. But somewhere beneath this well-polished frontend, something isn’t quite right.

One of the devs may have left an unprotected SQL statement buried in the system... and it's just waiting to be abused.

> 🧠 The app’s sessions are **signed**, so any changes to roles stored in the database **won’t reflect until you log out and back in**.

---

## 📍 Starting Point

Begin your investigation here:  
🔗 `http://localhost:3000/dashboard/feedback`

Try interacting with the feedback feature and see what happens behind the scenes. Your messages get stored — but how safely?

> 💬 There’s a **subtle clue** buried at the bottom of the **Help & FAQ** page. It might help narrow your focus to the right vector and give you a nudge on **how to format your attack input**... 

> 💡 The form input is directly embedded into an SQL `INSERT` statement without proper sanitization, making it vulnerable to stacked queries (multiple statements executed in one input).

---

## 🧪 Success Criteria

You know you’ve succeeded when:
1. You register and log in as a **normal user**.
2. You inject a payload **via the feedback system**.
3. You **log out**, then **log back in** using the same account.
4. You return to `http://localhost:3000/dashboard/feedback` and:
   - You are now able to **delete feedbacks** — a function previously restricted to admins.

---

## 🔍 Hints

- Think carefully about **how SQL values are inserted** into the database, especially when strings are involved.
- Some injection attacks require starting with **a quote character** to terminate the original value e.g., `x',`.
- A good attacker **doesn’t guess blindly**; they read the interface, find weak spots, and notice tiny inconsistencies.
- Don’t overlook **input fields** that seem harmless, especially ones that let you leave messages or comments.
> Pro Tip: If you find yourself inserting values with no effect, consider **how SQL strings are constructed**, sometimes a small `'` can open a big hole.

---

## ✅ Rules

- ❌ No brute-force or password guessing  
- ✅ You may register a new account  
- ❌ Do not tamper with session cookies directly, rather take a look at what you see when logging in, decode it.
- ✅ Only interact through legitimate UI or API calls  
- ✅ This is a **black-box challenge**, source code is not required to solve it

---

## 🏁 Tags

`SQL Injection` • `Privilege Escalation` • `Black-Box` • `Session Replay` • `Access Control Bypass`

---

## 🧠 Final Note

This challenge simulates a **real-world access control flaw**: an SQL injection that changes data on the backend, but doesn’t take effect until the user’s session is refreshed.

Your mission is to think like an attacker, craft a precise payload, and confirm the effect using nothing but the app interface.

No error messages. No stack traces. Just you, the browser, and a hint left behind in the wrong place.

Good luck, SecureBank Pentester,
-
Sunny Patel
-