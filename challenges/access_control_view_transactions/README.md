# Challenge: Access Control – View All User Transactions  
**Author:** Rija Baig  
**Difficulty:** ⭐⭐⭐☆☆ (Medium)  

---

## Goal

Bypass access restrictions and retrieve **all user transactions**, not just your own. The application limits results per user, but a developer oversight might give you full visibility — if you know what to send.

---

## Background

This banking dashboard restricts users to seeing **only their own** transactions. However, one of the devs left behind a forgotten **debugging mechanism** meant to help during development.

This logic is still present on the server and checks for a special condition. When triggered, it **disables user filtering**. This opens a hole for SQL injection or access control abuse via request manipulation.

---

## Where should you start?

Start here:  
🔗 `http://localhost:3000/dashboard/transactions`

Inspect how the page loads data. Consider intercepting the network request sent to:  
🔗 `http://localhost:3000/api/transactions`

Your job is to:

- Identify where the SQL injection or access control flaw occurs
- Inject the right header or field to trigger the hidden dev logic
- View every user's transactions, not just your own

>  Hint: Think like a developer during staging or debugging.

---

##  Success Criteria

You’ve completed the challenge when:
- You view **transactions that do not belong to your user account**
- You remain logged in as a regular user
- You only tampered with a request — not the front end or session


---

## Tips

- Think about what developers might use to test endpoints during development.
- There may be a specific **request header** that triggers an alternate code path...

Bonus Hint: Look at request metadata… what would a dev sneak in to enable extra functionality?

---

## Rules

- ✅ You may use any browser dev tools or proxy tools (e.g., Burp)
- ✅ You may register and log in with a normal user account
- ❌ Do not modify cookies or access restricted routes directly
- ✅ Focus on the public endpoints and headers

---

## Tags

`Access Control` • `Horizontal Privilege Escalation` • `Dev Mode` • `SQL Injection` • `API Abuse`

---

## Bonus Challenge (Optional): Time-Based SQL Injection – Trigger the Developer Backdoor
**Difficulty:** ⭐⭐⭐⭐☆ (Medium-Hard) 

The `/dashboard/transactions/new` page allows users to submit a new transaction. But this isn’t just for regular users — the dev team secretly uses it for maintenance automation.

During internal development, the backend listens for specific combinations of data (like certain dates or fields) to activate internal SQL scripts. This backdoor still exists in production. Under the right conditions, it enables a full SQL injection — but only if you know when and how to trigger it.

## Goal
- Submit a crafted input that activates hidden dev logic during a scheduled “maintenance window.” When triggered, this logic enables a vulnerable SQL execution path that can affect data beyond your account.

Bonus Hint: The app gives a small clue about **a recurring development window** — keep an eye out for banners or labels that suggest when certain behaviours are "under maintenance" (especially in places where data is submitted).

 One field lets you select a type or reason - try looking at it with a developer’s mindset.

---

## Summary 


This two-part challenge explores real-world SQL injection vectors hidden in unexpected places: HTTP headers, debug modes, and dev-time scripts.

Pay close attention to how requests are handled behind the scenes. A little dev oversight can lead to a major data leak.

Good luck,  
\- Rija Baig
