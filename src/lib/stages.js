// Internal build state — the platform's six stages, for the private portal.
//
// This replaced the old five-phase business roadmap when the company's work
// became the endpoint management platform. Every `state` here must match what
// is actually true in BokgoniTech_Agent / _Backend / _Dashboard. A roadmap that
// says "done" when it means "mostly" is exactly the failure the product is
// built to avoid — so it applies to this page too.
//
// Each stage builds on the last. A tool that answers stage 5 without stage 1
// is guessing.

// `state` values are the ones StateBadge knows how to render: 'built',
// 'built-hidden', 'not-started'.
export const stages = [
  {
    id: 1,
    slug: 'inventory',
    name: 'Inventory',
    question: 'What computers do I have?',
    state: 'built',
    purpose:
      'Know every machine that exists, what it is, and what is on it — the foundation every later stage reads from.',
    sections: {
      'What this stage is':
        'Every machine with the agent installed appears in a list, with make and model, memory, disk, Windows version and installed software.',
      'Why it exists':
        'Most people looking after twenty computers do not have a list of them — they have a spreadsheet somebody stopped updating. Nothing above this stage can be trusted without it.',
      'What it covers':
        'Hostname, logged-in user, OS name and version, kernel build, architecture, hardware make and model, memory and per-volume disk, installed software.',
      'What the agent collects':
        'A full host and system report once a minute, with a stable device identity that survives reboots and renames.',
      'What the backend does':
        'Stores the current state plus history per device, separated per customer by the database itself.',
      'What you see in the dashboard':
        'The machine list, and a page per machine with its full inventory.',
      'How it is delivered':
        'One installer command puts the agent on a machine as a Windows service; it enrols itself and appears in the list.',
      'The careful part':
        'A collector that cannot read something reports that it could not read it — never a zero and never an empty list. An empty local-accounts list on Windows is impossible, so it is recorded as a failed read.',
      'What is verified':
        'Running as a Windows service on a real machine, surviving reboots, with all collectors healthy.',
      'Known gaps':
        'The installer is not code-signed, so Windows warns when it runs. There is no hosted download page.',
      'Risks and controls':
        'A stale inventory is worse than none. Controlled by the once-a-minute report and a disk-backed spool, so a machine that was offline backfills rather than going quiet.',
      'What success looks like':
        'You can answer “what do we have” without walking anywhere, and you trust the answer.',
      'Next stage connection':
        'Once you know what exists, you can ask how each one is doing — stage 2.',
    },
  },
  {
    id: 2,
    slug: 'health',
    name: 'Health and history',
    question: 'How are they doing?',
    state: 'built',
    purpose:
      'Show which machines are about to cause a problem, not only which ones are broken today.',
    sections: {
      'What this stage is':
        'Disk, memory, processor and network — the current reading and the history behind it.',
      'Why it exists':
        'A disk at 96% is not an emergency this morning and is one on Friday. Only the trend tells you that.',
      'What it covers':
        'CPU utilisation and core count, memory and swap, uptime, per-volume disk usage, network interfaces and traffic.',
      'What the agent collects':
        'The same once-a-minute report, buffered to disk when the server cannot be reached and uploaded with retry and jitter when it can.',
      'What the backend does':
        'Keeps partitioned history per device so a month of readings is queryable without slowing the live view.',
      'What you see in the dashboard':
        'Current metrics per machine, and the history as a series rather than a single number.',
      'How it is delivered':
        'Nothing to configure — it arrives with the agent.',
      'The careful part':
        'A gap in the history is shown as a gap. A laptop that spent the weekend offline does not get a flat line drawn through it.',
      'What is verified':
        'Real readings from a real machine, including per-volume disk on the device detail endpoint.',
      'Known gaps': 'None known at this stage.',
      'Risks and controls':
        'History grows without bound. Controlled by partitioning, so old data can be dropped a partition at a time.',
      'What success looks like':
        'You can see a machine getting worse before it fails, and say when it started.',
      'Next stage connection':
        'Once there is a history, a threshold means something — stage 3.',
    },
  },
  {
    id: 3,
    slug: 'alerting',
    name: 'Alerting',
    question: 'What needs my attention?',
    state: 'built',
    purpose: 'Tell somebody when a machine crosses a line, and tell them when it stops.',
    sections: {
      'What this stage is':
        'Rules on the values from stage 2 — “tell me when any machine drops below 10% free disk” — with email delivery.',
      'Why it exists':
        'Nobody watches a dashboard all day. Without this, stage 2 only helps people who were already looking.',
      'What it covers':
        'Thresholds per metric, a required number of consecutive breaches before firing, resolution when the condition clears, and maintenance windows.',
      'What the agent collects': 'Nothing extra — alerting is evaluated on the server.',
      'What the backend does':
        'Evaluates every rule against incoming reports, records firing and resolution, and sends the emails.',
      'What you see in the dashboard': 'Active alerts, alert history, and the rule settings.',
      'How it is delivered': 'Rules are set per customer in the dashboard.',
      'The careful part':
        'An alert that fires and never resolves is a tool people learn to ignore, so resolution is a first-class event. Maintenance windows hold the emails but still record the alerts — silencing the record would hide the night the patch run actually broke something.',
      'What is verified': 'Rules firing, resolving, and being suppressed by a maintenance window.',
      'Known gaps':
        'Email is the only delivery channel. No SMS, no webhook, no on-call rotation.',
      'Risks and controls':
        'Alert fatigue. Controlled by the consecutive-breach requirement and by resolution notices, so the inbox stays meaningful.',
      'What success looks like':
        'The disk that filled up was dealt with on Tuesday, not at 2am on Saturday.',
      'Next stage connection':
        'Knowing is not fixing. Stage 4 is being able to do something from the same page.',
    },
  },
  {
    id: 4,
    slug: 'action',
    name: 'Remote action',
    question: 'Can I fix it from here?',
    state: 'built',
    purpose: 'Act on a machine without driving to it, and keep a record that is worth something.',
    sections: {
      'What this stage is':
        'Saved scripts, service restarts, machine restart and shutdown, a read-only diagnostic, scheduled runs — and patch installation, which is the biggest piece of it.',
      'Why it exists':
        'Restarting a stuck service in another building is a morning. It should be a click with a record attached.',
      'What it covers':
        'Run a saved script on one machine or a group; restart a service; restart or shut down a machine; run six read-only checks that change nothing; schedule any of it. Patching installs what Windows reports missing, one update at a time.',
      'What the agent collects':
        'It holds a connection open to receive work, writes each command to disk before running it, and reports the result — plus progress for long jobs.',
      'What the backend does':
        'Records every command as issued, delivered, running, or finished, with who asked, when, and what came back. One command at a time per machine.',
      'What you see in the dashboard':
        'The action buttons on a machine page, the schedule settings, and the full command history.',
      'How it is delivered':
        'Through the same outbound connection the agent already holds open — the server never dials in to a customer machine.',
      'The careful part':
        'Patch results are reported per update: “6 installed, 2 need a restart, 1 failed”. Installed and installed-needs-restart are different states, because an update awaiting a reboot has not taken effect. Updates a halted run never reached are recorded as not attempted — not failed, which would accuse something that never ran. A scheduled run that skipped a machine records the skip. And it never restarts a machine on its own.',
      'What is verified':
        'Real updates installed on a real computer, including a run that crossed a restart and resumed.',
      'Known gaps':
        'Software deployment — pushing an installer to a machine — is built and tested but hidden in the interface until there is a fleet to use it on. Two lines of code bring it back.',
      'Risks and controls':
        'A half-finished script is the dangerous case. Controlled by never re-running an interrupted ordinary command automatically: only long jobs resume, because only they can say where they got to.',
      'What success looks like':
        'You can answer “did that fix I applied last Tuesday actually work?” from the record.',
      'Next stage connection':
        'With action in place, security posture becomes something you can fix as well as see — stage 5.',
    },
  },
  {
    id: 5,
    slug: 'posture',
    name: 'Security posture',
    question: 'Are they protected?',
    state: 'built',
    purpose: 'Answer the question an insurer, client or auditor asks, with evidence rather than belief.',
    sections: {
      'What this stage is':
        'Antivirus, firewall per profile, disk encryption and TPM, Secure Boot and UAC, who has administrator rights, failed sign-ins, USB storage history, and Windows update status.',
      'Why it exists':
        'The honest answer to “are your machines patched and encrypted?” is usually “I think so”. That is not an answer.',
      'What it covers':
        'Which antivirus, whether it is on and up to date; firewall state per profile rather than a single on/off; encryption and TPM; Secure Boot and UAC; local administrators; failed sign-in attempts with counts and origin; every USB storage device ever attached; missing updates, how long since the machine last checked, and which are security updates.',
      'What the agent collects':
        'WMI and event-log queries — the slowest collector by an order of magnitude, which is why it is off by default until an operator enables it.',
      'What the backend does':
        'Stores each field with its read status, so absent and unreadable stay distinguishable all the way to storage.',
      'What you see in the dashboard':
        'A posture view per machine, with “could not check” rendered as itself.',
      'How it is delivered': 'Enabled per deployment in the agent configuration.',
      'The careful part':
        'This is where the product’s rule earns its keep. If the agent cannot read the firewall, the dashboard says “could not check” — never “firewall off”. Patch data carries the date it was last checked, because a machine that stopped asking for updates three weeks ago is a different and often worse problem than a machine with none pending.',
      'What is verified':
        'Antivirus products with real enabled and up-to-date state, firewall per profile, and patch status on a real machine.',
      'Known gaps':
        'Event-log coverage beyond failed sign-ins is thin. Nothing here interprets what it finds — that is stage 6, on purpose.',
      'Risks and controls':
        'Reporting a posture check as passed when it was never read. Controlled by carrying read status through the agent, the wire format, the database and the dashboard — all four, or the distinction is gone by the time a person sees it.',
      'What success looks like':
        'A one-minute, defensible answer to the compliance question, and it is still true tomorrow.',
      'Next stage connection':
        'Only once all five are dependable does interpreting them stop being guesswork — stage 6.',
    },
  },
  {
    id: 6,
    slug: 'detection',
    name: 'Detection and response',
    question: 'Is something malicious happening?',
    state: 'not-started',
    purpose:
      'Spot an attack in progress and cut a machine off the network. Deliberately last, and not started.',
    sections: {
      'What this stage is':
        'Interpreting the telemetry from stages 1–5 as evidence of an attack, and isolating a machine in response.',
      'Why it exists':
        'It is the sixth question customers ask, and the one the earlier five make answerable.',
      'What it covers': 'Nothing yet. No code has been written for this stage.',
      'What the agent collects': 'Nothing specific to detection.',
      'What the backend does': 'Nothing specific to detection.',
      'What you see in the dashboard': 'Nothing. It is not represented in the interface.',
      'How it is delivered': 'Not delivered.',
      'The careful part':
        'The reason it is last is the whole argument: detection built on unreliable information produces confident accusations about the wrong machines. Every earlier question has to be answered dependably first, or this one generates alarms nobody can check and everyone learns to dismiss.',
      'What is verified': 'Nothing. This stage has not been started.',
      'Known gaps': 'All of it.',
      'Risks and controls':
        'Starting it early is the risk. The control is refusing to, and saying so publicly rather than listing it as “coming soon”.',
      'What success looks like':
        'An alarm a technician can check and confirm, every time — not a feed they mute in week two.',
      'Next stage connection':
        'This is the last stage. Everything before it exists to make it trustworthy.',
    },
  },
]

// Shown on the roadmap page and on the public status page. Keep in sync with
// `buildState.gaps` in siteConfig.js — same three facts, stated once each.
export const knownGaps = [
  {
    label: 'Not code-signed',
    text: 'Windows shows a warning when someone runs the installer. Needs a code-signing certificate.',
    blocks: 'Handing the installer to a customer without explaining the warning first.',
  },
  {
    label: 'No download page',
    text: 'The installer is built but not hosted anywhere.',
    blocks: 'Self-service signup. Every pilot is currently set up by hand.',
  },
  {
    label: 'Detection and response not started',
    text: 'Stage 6. Deliberately last.',
    blocks: 'Competing on security features — but not on visibility, which is what stages 1–5 sell.',
  },
]

export const sectionOrder = [
  'What this stage is',
  'Why it exists',
  'What it covers',
  'What the agent collects',
  'What the backend does',
  'What you see in the dashboard',
  'How it is delivered',
  'The careful part',
  'What is verified',
  'Known gaps',
  'Risks and controls',
  'What success looks like',
  'Next stage connection',
]
