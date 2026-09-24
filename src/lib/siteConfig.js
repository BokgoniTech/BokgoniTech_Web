// Central content & configuration for the Bokgoni Tech site.
// Edit copy here — components read from these objects so you rarely touch JSX.
//
// Source of truth for everything below is the platform's own product docs in
// BokgoniTech_Agent/docs/product/. If a claim changes there, change it here —
// and nowhere else on the site.

export const contact = {
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '27000000000',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@bokgonitech.co.za',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+27 00 000 0000',
  location: import.meta.env.VITE_CONTACT_LOCATION || 'Pretoria, South Africa',
  hours: 'Mon–Fri 08:00–17:00',
}

export const whatsappLink = (
  message = "Hi Bokgoni Tech, I'd like to talk about the endpoint management platform.",
) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`

// --- The product ------------------------------------------------------------

export const product = {
  name: 'Bokgoni Endpoint Management',
  tagline: 'Know what your Windows machines are actually doing.',
  oneLiner:
    'A tool for looking after Windows computers you are responsible for but are not sitting in front of.',
  summary:
    'You install a small program on each machine. It reports what that machine looks like, and lets you act on it from a web page — check what is wrong, install updates, run a fix, restart it.',
  platform: 'Windows only',
}

// --- The five questions it answers -------------------------------------------
// Each builds on the last: a tool that answers the fifth without the first is
// guessing.
//
// Build state deliberately does not appear here any more. What is finished,
// what is not, and what is deliberately deferred is real and is still tracked —
// in `stages.js`, behind the staff portal, which is where a roadmap belongs. A
// visitor deciding whether to talk to us needs to know what the product does
// for them, not which sprint a capability landed in.

export const questions = [
  {
    slug: 'inventory',
    icon: 'list',
    question: 'What computers do I have?',
    answer: 'Every machine, what it is, what is on it',
  },
  {
    slug: 'health',
    icon: 'chart',
    question: 'How are they doing?',
    answer: 'Disk, memory, processor, network — now and over time',
  },
  {
    slug: 'alerting',
    icon: 'bell',
    question: 'What needs my attention?',
    answer: 'Alerts when something crosses a line you set',
  },
  {
    slug: 'action',
    icon: 'bolt',
    question: 'Can I fix it from here?',
    answer: 'Run a script, restart a service, restart the machine',
  },
  {
    slug: 'posture',
    icon: 'shield',
    question: 'Are they protected?',
    answer: 'Antivirus, firewall, encryption, updates, who can sign in',
  },
]

// --- What a client actually gets ---------------------------------------------
// The home page's second half. Outcomes rather than capabilities: the
// capability list lives on /product, and a visitor who has not decided they
// have the problem yet will not read it.

export const outcomes = [
  {
    icon: 'question',
    title: 'Answers in under a minute',
    body: 'Are all our machines patched? Is antivirus actually on, everywhere? Which machine is about to run out of disk? One page, not an afternoon of remoting in.',
  },
  {
    icon: 'bell',
    title: 'You hear about it on Tuesday',
    body: 'A disk fills up gradually and fails suddenly. Thresholds you set, alerts that wait before shouting and tell you when they clear — so the problem is dealt with in working hours.',
  },
  {
    icon: 'bolt',
    title: 'Fixes without the drive',
    body: 'Restart a service, run a saved script, install the updates, reboot the machine — from where you are, on one machine or a group, with a record of who did what.',
  },
  {
    icon: 'shield',
    title: 'The compliance answer, evidenced',
    body: 'When an insurer or a client asks whether every laptop is encrypted and patched, you answer from the dashboard instead of from memory.',
  },
]

// --- What working with us looks like -----------------------------------------

export const engagement = [
  {
    step: 'We set it up with you',
    body: 'One command puts it on a machine, and we do the first ones alongside you. Nothing to rack, nothing to learn before it starts reporting.',
  },
  {
    step: 'You watch a real fleet for a month',
    body: 'On one client, or one office. Long enough to see it catch something, which is the only demonstration that settles anything.',
  },
  {
    step: 'We stay reachable',
    body: 'We build the platform ourselves, so a question about why a machine reported something odd reaches the people who built it, not a support tier reading from a script.',
  },
]

// --- What it does: the capability sections ----------------------------------

export const capabilities = [
  {
    slug: 'inventory',
    icon: 'list',
    nav: 'What you have',
    title: 'It tells you what computers you have',
    body: 'Every machine you have installed it on appears in a list. For each one you can see the make and model, how much memory and disk it has, what version of Windows it runs, and what software is installed.',
    pullTitle: 'Why that is worth anything',
    pull: 'Most people who look after twenty computers do not actually have a list of them. They have a spreadsheet somebody stopped updating, and a memory of a laptop somebody left with.',
  },
  {
    slug: 'health',
    icon: 'chart',
    nav: 'How they are doing',
    title: 'It tells you how they are doing',
    body: 'Disk space, memory, processor, network traffic — right now, and as a history so you can see a machine getting worse rather than only that it is bad today.',
    pullTitle: 'The question it really answers',
    pull: 'Which machines are about to cause me a problem? A disk at 96% is not an emergency this morning and is one on Friday.',
  },
  {
    slug: 'alerting',
    icon: 'bell',
    nav: 'What needs attention',
    title: 'It tells you when something needs attention',
    body: 'You set a line — “tell me when any machine drops below 10% free disk” — and it tells you when a machine crosses it. By email, if you want.',
    points: [
      {
        label: 'It waits before shouting',
        text: 'You can say “only if it stays that way for three checks”, so a momentary spike does not wake anybody.',
      },
      {
        label: 'It tells you when it stops',
        text: 'An alert that fires and never resolves is a tool you learn to ignore.',
      },
      {
        label: 'Maintenance windows',
        text: 'Patching a hundred machines at 2am should not send a hundred emails. The alerts still happen and still get recorded; only the emails are held.',
      },
    ],
  },
  {
    slug: 'action',
    icon: 'bolt',
    nav: 'Fixing things remotely',
    title: 'It lets you fix things from where you are',
    body: 'Everything that runs is recorded: what ran, who asked for it, when, and what came back. That record is kept on the server, not on the machine — a record held by the computer under investigation is worth nothing.',
    list: [
      'Run a saved script on one machine or a group',
      'Restart a service that has stopped',
      'Restart or shut down a machine',
      'Run a diagnostic — six read-only checks that tell you what is wrong without changing anything',
      'On a schedule — anything you run by hand more than once',
    ],
  },
  {
    slug: 'posture',
    icon: 'shield',
    nav: 'Whether they are protected',
    title: 'It tells you whether they are protected',
    body: 'Windows updates, in particular: what is missing, how long since the machine last checked, and whether anything is a security update.',
    list: [
      'Antivirus — which one, is it on, is it up to date',
      'Firewall — per profile, not just “on”',
      'Disk encryption and TPM',
      'Secure Boot and UAC',
      'Who has administrator rights on each machine',
      'Failed sign-in attempts — how many, from where',
      'Every USB storage device ever plugged in',
    ],
  },
  {
    slug: 'patching',
    icon: 'download',
    nav: 'Installing updates',
    title: 'It installs updates',
    body: 'Pick a machine, click install. It installs what Windows says is missing, one update at a time, and reports each one individually.',
    quote: '6 installed, 2 need a restart, 1 failed',
    pullTitle: 'Why that last line matters',
    pull: 'Most tools tell you the job finished. This tells you what the job achieved — and if nothing installed, it says so plainly rather than reporting a successful run that did nothing.',
    note: 'It never restarts the machine on its own. It tells you a restart is needed and stops. Taking somebody’s work away without asking is not a feature.',
  },
]

// --- How it works, for the person buying it ----------------------------------
//
// Deliberately not architecture. There are three moving parts and they are
// interesting to build, but a customer is not buying a diagram — they are
// buying the fact that a machine in another building appears on a page and
// can be acted on. How that is achieved is our problem, and putting it on the
// website invites an evaluation of our design decisions instead of our
// product.
//
// The technical account still exists, in the platform's own docs. It is not
// marketing material.

export const howItWorks = [
  {
    icon: 'download',
    step: 'Install it on a machine',
    body: 'One command, once, per computer. It runs quietly in the background from then on and starts with the machine, so nobody has to be logged in for it to work.',
    detail: 'We do the first ones with you.',
  },
  {
    icon: 'monitor',
    step: 'The machine appears on your page',
    body: 'Within a minute it reports what it is, what is on it and how it is doing — and keeps doing so. Laptops that go home and come back fill in the gap rather than losing it.',
    detail: 'Nothing to open on the machine, and nothing for the user to notice.',
  },
  {
    icon: 'bell',
    step: 'You get told when something matters',
    body: 'You set the lines that matter to you — free disk, missing updates, antivirus off — and hear about a machine crossing one by email, once, with a note when it clears.',
    detail: 'Quiet by default. Alerts you can trust are alerts you still read in month six.',
  },
  {
    icon: 'bolt',
    step: 'You fix it from where you are',
    body: 'Install the updates, restart the service, run a saved script, reboot the machine — on one computer or a group, without a trip and without interrupting anyone to ask for access.',
    detail: 'Every action is recorded: what ran, who asked for it, and what came back.',
  },
]

// What it asks of the customer. Buyers ask this early and it is a short list,
// which is itself the selling point.

export const requirements = [
  {
    label: 'Windows machines',
    text: 'Windows only — desktops, laptops and servers. No Mac or Linux agent.',
  },
  {
    label: 'An internet connection',
    text: 'The machine reaches out to us. Nothing needs opening on your firewall or router, and nothing outside can knock on a machine.',
  },
  {
    label: 'Nothing else',
    text: 'No server to buy, no appliance to rack, no agent licence per technician, and no change to how people work.',
  },
]


// --- Who it is for ----------------------------------------------------------

export const audienceIntro =
  'Somebody responsible for between ten and a few hundred Windows computers that they cannot walk over to.'

export const audiences = [
  {
    name: 'The one-person IT department',
    body: 'A company of forty people with one person who looks after everything. They are not short of tools — they are short of hours, and most of their day is spent finding out what is going on rather than fixing it.',
  },
  {
    name: 'The small IT services firm',
    body: 'Six or eight client companies, a few hundred machines between them. They already pay for something like this and it is either expensive, sold per-technician, or built for enterprises and hard to use.',
  },
  {
    name: 'The company that just got asked a hard question',
    body: 'An insurer, a client, or an auditor has asked whether their machines are patched and encrypted. They do not have an answer, and the honest one is “I think so”.',
  },
]

export const buying = {
  headline: 'Answers, in under a minute.',
  intro: 'The questions that take an afternoon today, and should take a glance:',
  answers: [
    'Are all our machines patched?',
    'Is the antivirus actually on, everywhere?',
    'Which machine is about to run out of disk?',
    'Did that fix I applied last Tuesday actually work?',
  ],
  note: 'Every one of those is answerable today by walking to a machine or asking someone to check. The value is not that it becomes possible — it is that it becomes quick, and correct, and stays true tomorrow.',
}

export const savings = [
  {
    label: 'Time spent finding out',
    text: 'Most small-IT work is investigation, not repair. A machine is slow; you remote in, you look at disk, you look at memory, you look at what is running. Twenty minutes before you touch anything. Here that is one page you already had open.',
  },
  {
    label: 'Driving',
    text: 'Restarting a stuck service on a machine in another building is a morning. Here it is a click, and the record of it is kept.',
  },
  {
    label: 'The 2am discovery',
    text: 'A disk fills up gradually and fails suddenly. Something watching it tells you on Tuesday, not at 2am on Saturday.',
  },
  {
    label: 'Being caught out',
    text: 'Not knowing a laptop had encryption switched off is only a problem on the day it is stolen. That is also the day it is too late.',
  },
]

// Where it fits best. Positive framing only: the site no longer carries a
// "who it is not for" list, so this is the one place that helps the right
// customer recognise themselves.

export const bestFit =
  'A small IT services firm looking after a few hundred Windows machines across a handful of clients, or the one person responsible for everything at a company of forty. If that is you, a month on one client will tell you more than any demo.'

// --- Changelog areas (the public build log) ----------------------------------

export const changelogAreas = [
  { value: 'agent', label: 'Agent' },
  { value: 'backend', label: 'Backend' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'security', label: 'Security' },
  { value: 'patching', label: 'Patching' },
  { value: 'platform', label: 'Platform' },
]

// --- Pilot-request form options ---------------------------------------------

export const fleetSizeOptions = [
  'Under 10 Windows machines',
  '10–50 Windows machines',
  '50–200 Windows machines',
  'Over 200 Windows machines',
  'Not sure yet',
]

export const roleOptions = [
  'I am the only IT person here',
  'We are an IT services firm, looking after clients',
  'We have been asked to prove machines are patched / encrypted',
  'Evaluating on behalf of someone else',
  'Other',
]

export const contactMethods = ['Email', 'WhatsApp', 'Phone call']
