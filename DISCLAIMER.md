# disclaimer

securebank ctf is **intentionally insecure software**. it ships with deliberate
sql injection, broken access control, and privilege-escalation flaws so people
can learn to find and exploit them in a controlled setting. it is a teaching
tool in the spirit of owasp juice shop, not a real banking application.

## authorized use only

- use it only on systems and networks you own or are explicitly permitted to use.
- run it locally or on an isolated lab network. **do not expose it to the public
  internet.** it has deliberate vulnerabilities and ships with default
  credentials and a default cookie secret.
- the techniques practiced here are for authorized security education and
  testing only. using them against systems you do not own or lack permission to
  test may be illegal.

## not for production

do not copy patterns from this codebase into real software. the vulnerable code
exists to be exploited in exercises and must never be deployed as-is.

## change these before any shared or demo use

- seeded admin accounts (`admin` / `admin123`, `sunny.admin` / `sunny.admin123`).
- the bundled `COOKIE_SECRET` baked in for convenience; override it with a strong
  random value.

## no warranty

this software is provided "as is", without warranty of any kind. the authors and
contributors are not liable for any misuse or for any damage arising from its
use. see [LICENSE](LICENSE).

## reporting

found an *unintended* issue (something outside the designed challenges)? see
[SECURITY.md](SECURITY.md) for private disclosure.
