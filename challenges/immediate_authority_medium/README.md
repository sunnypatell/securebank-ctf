# 🛡️ Challenge: Register a New Admin via SQL Injection  
**Author:** Ajay Ariaran  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## 🎯 Objective

Craft an SQL injection payload on the **registration page** — specifically in the **password field** — so that you end up creating a **brand-new account** with the **admin** role.

---

## 💻 Background

By default, every newly created account is assigned the role of `user`. However, the application clearly distinguishes between different roles (e.g., `user` vs. `admin`).  

While traditional SQL injection attempts are seemingly blocked, not all is lost: the registration form has some input filtering, but can be bypassed through some clever use of specific tools...

> 🧠 *Hint:* It’s often easy to overlook the **password** field when thinking about injection. But remember, anywhere user input meets SQL, danger lurks!

---

## 📍 Starting Point

Begin your investigation at:  
**`http://localhost:3000/register`**

Your mission:  
1. Register a new account as `admin`.  
2. **Bypass** the client-side filters in place on the register page.  

> 💡 Tools like **Burp Suite** can be invaluable here. Intercepting the registration request allows you to manipulate the password field beyond the typical UI checks.

---

## 🧪 Success Criteria

You know you've cracked it when:  
1. You can **log in** with your newly registered account.  
2. On inspecting your session cookie or any profile details, you see that the account is indeed set to **`admin`**.

---

## 🔍 Hints

- If you’re stuck, try rethinking how **certain SQL statements** can be shortened or disguised (e.g., using alternative comment syntax or variations of known keywords).  

---

## ✅ Rules

- ✅ You **must** register a new account through the intended form.  
- ❌ You **may not** manipulate session cookies directly.  
- ✅ Your injection **must** occur via the **password field** during registration.

---

## 🏁 Tags

`SQL Injection` • `Admin Role Injection` • `Access Control` • `Black-Box` • `Input Filtering Bypass`

---

## 🧠 Final Note

This challenge highlights a **dangerous oversight** in user registration systems: Improper handling of inputs. Even slight oversights can allow attackers to inject the role they desire — **right at account creation**.

Stay persistent, test different injections, and keep an eye on the database’s reaction to your payloads. With a bit of creativity, you’ll prove that no security measure is airtight when faced with a determined attacker.

**Best of Luck,**  
*Ajay Ariaran*
