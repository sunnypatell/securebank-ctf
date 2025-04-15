# Challenge Name: **Immediate Authority**

---

- **Author:** Ajay Ariaran  
- **Difficulty:** ⭐⭐⭐☆☆ (Medium)

---

## What You Need to Achieve

> **Goal:**  
> Craft an SQL injection payload on the **registration page**—specifically in the **password field**—so that you end up creating a **brand-new account** with the **admin** role.

---

## Context & Insight

**Default Roles & Distinction**  
- By default, each newly created account is assigned the role of `user`.  
- The application differentiates between roles (`user` vs. `admin`).

**The Filtering Hurdle**  
- Traditional SQL injection attempts are seemingly blocked.  
- However, not all injection vectors are sealed. There is a filtering mechanism you can **bypass** with the right technique.

---

## Exploration Starting Point

**Registration Page URL:** 
http://localhost:3000/register

Your specific tasks:  
1. Register a new account as `admin`.  
2. Bypass client-side filters in the registration process.

> **Tip:**  
> Tools like **Burp Suite** can help intercept and modify the password input, circumventing any front-end constraints.

---

## Indicators of Success

1. You can **log in** with your newly registered account.  
2. Upon checking your session cookie or profile info, the role is set to **`admin`**.

---

## Hints & Approaches

- Consider how certain SQL statements can be **abbreviated** or **disguised**.  
- Alternative commenting methods or variations of keywords can bypass naive filters.

> **Advice:**  
> Keep iterating on your payloads, watch how the database responds, and never consider any seemingly simple payload too trivial to have an impact.

---

## The Rules of Engagement

- **Do**: Register a new account in the intended manner.  
- **Don’t**: Directly modify session cookies.  
- **Must**: Inject solely through the **password field** during registration.

---

## Reference Tags

`SQL Injection` • `Admin Role Injection` • `Access Control` • `Black-Box` • `Input Filtering Bypass`

---
**Best of luck!**,  
— *Ajay Ariaran*


