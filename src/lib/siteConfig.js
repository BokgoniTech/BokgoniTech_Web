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
    body: 'One command puts the agent on a machine, and we do the first ones alongside you. Nothing to rack, nothing to learn before it starts reporting.',
  },
  {
    step: 'You watch a real fleet for a month',
    body: 'On one client, or one office. Long enough to see it catch something, which is the only demonstration that settles anything.',
  },
  {
    step: 'We stay reachable',
    body: 'We build the platform ourselves, so a question about why a machine reported something odd reaches the people who wrote the collector.',
  },
]

// --- What it does: the capability sections ----------------------------------

export const capabilities = [
  {
    slug: 'inventory',
    icon: 'list',
    nav: 'What you have',
    title: 'It tells you what computers you have',
    body: 'Every machine that has the agent installed appears in a list. For each one you can see the make and model, how much memory and disk it has, what version of Windows it runs, and what software is installed.',
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

// --- How it works: the three pieces -----------------------------------------

export const pieces = [
  {
    slug: 'agent',
    name: 'The agent',
    where: 'the machine you look after',
    icon: 'monitor',
    summary: 'A small Windows service. Reports every minute, runs what you ask.',
    body: 'A small program installed on each machine, running as a Windows service — so it starts with the computer and nobody has to be signed in. Once a minute it looks at the machine and sends a report. It holds a connection open so you can send it work.',
    points: [
      {
        label: 'It dials out, never in',
        text: 'Your server never connects to a customer’s machine. This is not a preference — most machines sit behind a router or a firewall you do not control, and nothing outside can reach them. The agent making the call is the only arrangement that works, and it happens to be the safer one: there is no door on the customer’s machine for anyone to knock on.',
      },
      {
        label: 'If it cannot reach your server, it keeps the reports on disk',
        text: 'They are sent when the connection comes back. A laptop that spent the weekend offline does not lose the weekend.',
      },
    ],
  },
  {
    slug: 'backend',
    name: 'The backend',
    where: 'your server',
    icon: 'database',
    summary: 'Stores it all. Decides what needs attention.',
    body: 'Where everything is stored and every decision is made. It keeps the history for every machine, checks alert rules and sends the emails, and holds the record of every command ever issued — who, what, when, and the result.',
    points: [
      {
        label: 'Every customer’s data is separated at the database level',
        text: 'Not by a filter somebody remembered to write. A query that forgot to say “and only this customer” returns nothing rather than everything, because the database itself refuses.',
      },
    ],
  },
  {
    slug: 'dashboard',
    name: 'The dashboard',
    where: 'your browser',
    icon: 'dashboard',
    summary: 'The web page you actually look at.',
    body: 'A list of machines, a page per machine, alerts, and the administrative settings. It reads from your server.',
    points: [
      {
        label: 'It never talks to a customer’s machine directly',
        text: 'What you are looking at is your server’s record, not something the machine under investigation told the page just now.',
      },
    ],
  },
]

// --- How a command travels ---------------------------------------------------

export const commandLifecycle = [
  { actor: 'You', text: 'click “Restart the print spooler” on a machine’s page' },
  { actor: 'The dashboard', text: 'tells the backend; the backend writes it down as issued' },
  { actor: 'The agent', text: 'holding its connection open, picks it up' },
  {
    actor: 'The agent',
    text: 'writes it to disk before running it. If the machine dies mid-command, it knows on restart that it owes you an answer',
    emphasis: true,
  },
  { actor: 'The agent', text: 'runs it, and sends back what happened' },
  { actor: 'The backend', text: 'records the result' },
]

export const commandLifecycleNotes = [
  {
    label: 'Why the audit trail is trustworthy',
    text: 'At every step both sides can say what state the command is in. A command that was never delivered, one still running, and one that finished are three different things — and a tool that cannot tell them apart will eventually tell you a machine is fine when nobody ever asked it anything.',
  },
  {
    label: 'One command at a time per machine',
    text: 'Two commands racing on the same computer is how you get results that do not match what happened.',
  },
]

export const longJobs = {
  title: 'Long jobs are different',
  body: 'Installing updates takes an hour and restarts the machine partway. The program reporting back dies with the machine. So those are a separate kind of work: the agent reports progress as it goes — each report buys it more time — and it says in advance when it is about to restart the machine, so the server knows the silence is expected rather than a crash. Afterwards it picks up where it left off.',
  note: 'Only that kind of work resumes. An ordinary script that was interrupted is never re-run automatically: nobody can know whether a half-finished script is safe to repeat, and only a person has the context to judge it.',
}

export const stack = [
  { piece: 'Agent', builtWith: 'Rust', why: 'One small file, no runtime to install, low memory' },
  {
    piece: 'Backend',
    builtWith: 'Rust, PostgreSQL',
    why: 'Same reasons, plus a database that enforces the customer separation itself',
  },
  { piece: 'Dashboard', builtWith: 'Next.js', why: 'Ordinary web tooling' },
]

export const stackNote = 'Runs on one modest server today. Nothing here needs a cluster.'

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
  headline: 'The end of not knowing.',
  intro: 'Not features. The specific relief is being able to answer, in under a minute:',
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

export const notFor = [
  {
    label: 'Very large companies',
    text: 'Anyone with a thousand machines and a proper IT department already has Intune or SCCM, and their problem is not visibility.',
  },
  {
    label: 'Anyone who needs Mac or Linux',
    text: 'This is Windows only. That is not a limitation to apologise for — it is where the customers are — but it is a hard no for a mixed estate.',
  },
  {
    label: 'Anyone wanting to remote-control a screen',
    text: 'There is no screen sharing. It is a considered omission: it is a large piece of work with its own security model, and nothing else depends on it.',
  },
]

// Qualification, kept deliberately. "Who it is not for" is not self-deprecation
// — it is the fastest way for the right customer to recognise themselves, and
// it saves everybody a month finding out.

export const bestFit =
  'A small IT services firm looking after a few hundred Windows machines across a handful of clients, or the one person responsible for everything at a company of forty. If that is you, a month on one client will tell you more than any demo.'

// --- What makes it different ------------------------------------------------

export const rule = 'Not knowing something is different from knowing it is fine.'

export const ruleProblem = {
  intro:
    'Ask a monitoring tool: does this machine have antivirus? Most will answer no in two completely different situations:',
  cases: [
    'The machine genuinely has no antivirus',
    'The check failed — no permission, a service was down, the machine did not answer',
  ],
  outro:
    'Those need opposite responses. The first sends you to fix a machine. The second sends you to fix your monitoring. A tool that reports them identically will, sooner or later, tell you a fleet is healthy when it has simply stopped looking.',
}

export const rulePractice = [
  {
    label: 'A collector that cannot read something says so',
    text: 'It does not report zero. If the agent cannot check the firewall, the dashboard says “could not check”, not “firewall off”.',
  },
  {
    label: 'A scan with a date attached',
    text: 'Patch information is shown with when it was last checked. A machine that last looked for updates three weeks ago is not a machine with no updates pending — it is a machine that has stopped asking, which is a different and often worse problem.',
  },
  {
    label: 'A schedule that ran and did nothing says so',
    text: 'A machine can be busy, offline, or removed, and none of those produce a result. Every scheduled run records what happened to every machine, including the ones it skipped — so a nightly job quietly skipping the one machine that needed it is visible instead of invisible.',
  },
  {
    label: '“Installed” and “installed, needs a restart” are different',
    text: 'An update that needs a reboot has not taken effect. Reporting it as done would say a machine is patched while the hole is still open.',
  },
  {
    label: 'An update the run never reached is not a failure',
    text: 'If a patch job stops halfway, the ones it never got to are recorded as not attempted — not omitted, which would make them look out of scope, and not failed, which would accuse something that never ran.',
  },
  {
    label: 'An empty list is never a silent success',
    text: 'No local accounts on a Windows machine is impossible, so that is reported as a failed read, not as a machine with no accounts.',
  },
]

export const ruleLayers = [
  { layer: 'The agent', must: 'must distinguish “read it, found nothing” from “could not read”' },
  { layer: 'The wire format', must: 'must be able to carry the difference' },
  { layer: 'The database', must: 'must store absent as different from zero' },
  {
    layer: 'The dashboard',
    must: 'must render “unknown” as unknown rather than as a dash that looks like a zero',
  },
]

export const ruleLayersNote =
  'Miss it in any one of those and the distinction is gone by the time it reaches a person. Which is why most tools do not have it — not because nobody thought of it, but because it has to be there from the beginning.'

// The rule, stated as the benefit it buys rather than as a confession about
// what the product is not. Same claim, written for somebody choosing a tool.
export const rulePayoff = {
  title: 'What that is worth to you',
  body: 'You can act on what the dashboard says. A green tick means a check ran and passed, not that a check was attempted. When something could not be read you are told, so the one machine that quietly stopped reporting shows up as a machine to look at rather than disappearing into a healthy-looking fleet.',
}

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
