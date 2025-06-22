
# TradeBot: Product Requirements Document (PRD)

---

## 1. Overview

TradeBot is a one-page web app powered by GPT. It responds to the user's natural-language cry for help—"fuck it, I need a..." —with a sarcastic, honest, and helpful trade recommendation. It returns a real trade pulled from the web (via GPT) and, when available, a paid shout-out trade who bought placement. The experience is fast, funny, and transparent.

It is intentionally sweary, intentionally blunt, and intentionally better than the SEO-slathered trade directories it aims to make irrelevant.

---

## 2. Goals

* Help users find a reliable local trade fast
* Provide transparent, irreverent recommendations using GPT
* Let trades pay to get featured—no dark patterns
* Keep the tone consistent: helpful, rude, lovable
* Make it shareable, viral, and delightfully weird

---

## 3. Personas

* Homeowner with a plumbing emergency who is stressed and just wants someone decent
* 30-year-old millennial who would rather type "fuck it I need a man" than scroll Checkatrade
* Tradesperson who wants to get seen but hates bidding/pay-per-lead systems
* Internet user who finds the site funny and sends it to 5 mates

---

## 4. User Stories

* As a user, I want to say or type what I need and get a real trade rec without filling out a form
* As a user, I want to know if a trade paid to be featured
* As a trade, I want to pay to get shown in my area and see results
* As a user, I want the bot to ask clarifying questions in a funny way
* As a user, I want to share funny responses (especially easter eggs)

---

## 5. Features

### Core

* Text input: "fuck it I need a plumber"
* Voice input (via Web Speech API)
* GPT-driven response (via Custom GPT or OpenAI API)
* Clarifying question flow: e.g., "what's wrong with the toilet? leak or block?"
* Trade returned with:

  * Name
  * Location
  * Phone (if available)
  * Website or profile link
  * One-line review summary
* Paid trade + free trade side-by-side when available
* Footer disclaimer

### Bonus / Viral

* Easter egg queries:

  * "fuck it I need a shag" → funny montage ending in "fuck off"
  * "fuck it I need a bouncy castle" → chaotic party disaster
* Screenshot-friendly reply formatting
* Share button (copy link or prefilled tweet)

---

## 6. Technical Requirements

| Area            | Tooling / Notes                        |
| --------------- | -------------------------------------- |
| Front end       | Next.js + TypeScript + Tailwind        |
| IDE             | Cursor                                 |
| Hosting         | Vercel                                 |
| Voice Input     | Web Speech API (Chrome-first)          |
| GPT Integration | Custom GPT via link (initially) or API |
| Repo            | GitHub linked to Cursor                |

---

## 7. GPT Setup

* Custom GPT name: TradeBot
* Link: [https://chat.openai.com/g/g-6856f28849088191ba50c5d9bfd5401a-tradebot](https://chat.openai.com/g/g-6856f28849088191ba50c5d9bfd5401a-tradebot)
* System prompt includes:

  * Banter tone
  * Easter egg triggers
  * Paid + unpaid trade flow logic
  * Response structure
  * Disclaimer logic when no trade found
* Browsing tool enabled

---

## 8. Paid Feature Logic

* Optional JSON file to mock paid trades:

  * If user location and job match, show paid trade first
  * Then show a GPT-picked real trade
  * Label clearly: "This one paid me. This one didn’t. Who knows."
* Trades pay £9.99/mo (handled later via Stripe or LemonSqueezy)

---

## 9. Design Considerations

* One-page only
* Big header: "Fuck it. I need a..."
* Chat bubbles: user + bot
* Rounded, mobile-friendly cards
* Strong spacing, readable font sizes
* Footer that is legally clean but in-tone

---

## 10. Success Criteria

* MVP deployed on custom domain
* Real trade returned within 5 seconds
* 3+ easter eggs implemented
* 100+ screenshots shared in first week
* 10 trades pay to be featured in month 1

---

## 11. Roadmap

| Phase | Feature Set                                        |
| ----- | -------------------------------------------------- |
| 1     | Text input, GPT reply, basic styling               |
| 2     | Voice input, paid trade injection logic            |
| 3     | Easter eggs, share button, scroll-to-latest        |
| 4     | Trade payment system, Vercel deployment, analytics |

---

Ready to go. Let's build the funniest, most honest trade bot on the internet.
# TradeBot - Force Deploy Sun Jun 22 20:53:02 BST 2025
