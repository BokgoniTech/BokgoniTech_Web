// Internal business "operating manual" — phase explainers for the private portal.
// Each phase follows the same structured layout from the business plan.

export const phases = [
  {
    id: 1,
    slug: 'phase-1',
    name: 'Device Repair',
    purpose:
      'Generate early cash flow, build customer trust and develop technical discipline.',
    sections: {
      'What this phase is':
        'Hands-on phone and laptop repair — the entry service that brings in the first paying customers.',
      'Why it exists':
        'Repairs create immediate revenue, build a local reputation, and force good technical and record-keeping habits early.',
      'What services it includes':
        'Phone screens, batteries, charging ports, software fixes, laptop upgrades and parts replacement.',
      'Who the customers are':
        'Individuals, students, small shops and anyone with a broken or slow device.',
      'What problems they have':
        'Cracked screens, dead batteries, charging faults, slow or virus-infected devices.',
      'How work is delivered':
        'Intake → diagnosis → quote → approval → repair → testing → collection.',
      'Required tools and systems':
        'Screwdrivers, heat mat, pry tools, multimeter, microscope (later), adhesives, cleaning and testing tools.',
      'Required skills and staff':
        'Competence in a limited set of common repairs before accepting complex work. One technician to start.',
      'Pricing and revenue model':
        'Per-job pricing: parts cost + labour. Quote before every repair; take a deposit on ordered parts.',
      'Risks and controls':
        'Damaging devices, poor-quality parts, customer-data privacy, incorrect diagnosis, weak record keeping. Control with checklists, trusted suppliers, and a repair record per job.',
      'What must be ready before launching':
        'Be competent in a limited set of repairs before accepting more complex work. Basic toolkit and a record system.',
      'What success looks like':
        'Profitable repairs, low return rate, good customer reviews, clear repair records and repeat customers.',
      'Next phase connection':
        'Repair customers (especially small businesses) become IT-support clients in Phase 2.',
    },
  },
  {
    id: 2,
    slug: 'phase-2',
    name: 'IT Support',
    purpose: 'Turn one-off repair customers into long-term business clients.',
    sections: {
      'What this phase is':
        'Ongoing IT support for small businesses — computers, networks, email and backups.',
      'Why it exists':
        'Recurring support contracts create predictable monthly revenue instead of one-off jobs.',
      'What services it includes':
        'Computer support, Wi-Fi, printers, Microsoft 365, cloud storage, backups, remote support and managed IT.',
      'Who the customers are':
        'Small offices, shops, schools, churches, property businesses, startups and community organisations.',
      'What problems they have':
        'Slow or unreliable technology, no backups, email and Wi-Fi issues, no one to call when things break.',
      'How work is delivered':
        'Once-off jobs plus monthly managed support, delivered remotely and on-site.',
      'Required tools and systems':
        'Ticketing, device inventory, documentation, remote support, backup monitoring and client contracts.',
      'Required skills and staff':
        'Networking, Microsoft 365 administration, backup and support fundamentals.',
      'Pricing and revenue model':
        'Once-off jobs + monthly managed IT contracts.',
      'Risks and controls':
        'Over-promising uptime, client data handling, scope creep. Control with clear contracts and documented systems.',
      'What must be ready before launching':
        'A ticketing/inventory system and a repeatable onboarding process for new clients.',
      'What success looks like':
        '10–15 recurring business clients, documented client systems, profitable monthly support revenue.',
      'Next phase connection':
        'Supported clients need their accounts, devices and data secured — leading into Phase 3.',
    },
  },
  {
    id: 3,
    slug: 'phase-3',
    name: 'Cybersecurity',
    purpose: 'Protect client accounts, devices and data, and add higher-value services.',
    sections: {
      'What this phase is':
        'Practical security controls layered on top of IT support — risk reduction, not guarantees.',
      'Why it exists':
        'Security is a growing need and a natural, higher-value extension of managing client systems.',
      'What services it includes':
        'Health checks, MFA, secure email, endpoint protection, backups, secure Wi-Fi, patching, awareness training, access management and incident-response planning.',
      'Who the customers are':
        'Existing IT clients and businesses that handle sensitive customer or financial data.',
      'What problems they have':
        'Weak passwords, no MFA, phishing risk, no recovery plan, unmanaged access.',
      'How work is delivered':
        'Assessment → recommendations → implementation → monitoring → training.',
      'Required tools and systems':
        'Password/MFA tooling, endpoint protection, backup monitoring, patch management.',
      'Required skills and staff':
        'Security fundamentals, awareness of common threats and recovery planning.',
      'Pricing and revenue model':
        'Project-based assessments + recurring security add-ons to managed IT contracts.',
      'Risks and controls':
        'Never guarantee complete protection. Document scope, set realistic expectations, keep recovery plans tested.',
      'What must be ready before launching':
        'Solid IT-support delivery and clear, honest security wording for customers.',
      'What success looks like':
        'Clients with MFA, backups and a recovery plan in place; fewer incidents; security revenue added to contracts.',
      'Next phase connection':
        'Secured, documented clients are ready for custom software and automation — Phase 4.',
    },
  },
  {
    id: 4,
    slug: 'phase-4',
    name: 'Software Development',
    purpose: 'Replace manual business processes with custom software.',
    sections: {
      'What this phase is':
        'Building websites, portals, apps and internal tools tailored to how a client works.',
      'Why it exists':
        'Software is high-value, scalable work and deepens the relationship with established clients.',
      'What services it includes':
        'Websites, e-commerce, booking systems, client portals, inventory and job-management systems, dashboards, mobile apps, payment integrations and automation.',
      'Who the customers are':
        'Businesses with manual, repetitive processes that slow them down.',
      'What problems they have':
        'Paper/spreadsheet workflows, no online presence, no booking or inventory system.',
      'How work is delivered':
        'Understand the problem → map the workflow → design → build in stages → test with users → launch → support and improve.',
      'Required tools and systems':
        'Development environment, version control, hosting, and a project/communication process.',
      'Required skills and staff':
        'Web/app development, database design and project delivery.',
      'Pricing and revenue model':
        'Project fees + ongoing support/hosting retainers.',
      'Risks and controls':
        'Scope creep, unrealistic timelines, maintenance burden. Control with staged builds and written scope.',
      'What must be ready before launching':
        'A repeatable delivery process and at least one strong reference project.',
      'What success looks like':
        'Delivered systems that clients rely on daily, plus recurring support revenue.',
      'Next phase connection':
        'Custom systems become the platform for AI, IoT and automation — Phase 5.',
    },
  },
  {
    id: 5,
    slug: 'phase-5',
    name: 'Robotics, IoT, AI & Automation',
    purpose: 'Deliver advanced automation and connected systems as the business matures.',
    sections: {
      'What this phase is':
        'Practical AI, IoT, robotics and automation built on top of the software and systems work.',
      'Why it exists':
        'It is the long-term vision — efficient, intelligent systems that set Bokgoni Tech apart.',
      'What services it includes':
        'AI assistants and business automation, smart sensors and IoT, automated reporting, smart security, robotics education and connected business systems.',
      'Who the customers are':
        'Established clients ready to automate, and organisations investing in smart systems.',
      'What problems they have':
        'Repetitive manual work, no real-time monitoring, untapped data.',
      'How work is delivered':
        'Identify automation opportunities → prototype → deploy → monitor and improve.',
      'Required tools and systems':
        'AI/automation platforms, IoT hardware and sensors, monitoring and reporting tools.',
      'Required skills and staff':
        'AI/automation, embedded/IoT and integration skills.',
      'Pricing and revenue model':
        'Solution projects + ongoing monitoring and improvement retainers.',
      'Risks and controls':
        'Over-reach before fundamentals are solid, hardware reliability, ongoing maintenance. Control by only taking on what can be supported.',
      'What must be ready before launching':
        'Strong delivery across Phases 1–4 and proven demand from existing clients.',
      'What success looks like':
        'Live automation and connected systems delivering measurable efficiency for clients.',
      'Next phase connection':
        'A mature, full-stack technology business — repair to robotics.',
    },
  },
]

export const sectionOrder = [
  'What this phase is',
  'Why it exists',
  'What services it includes',
  'Who the customers are',
  'What problems they have',
  'How work is delivered',
  'Required tools and systems',
  'Required skills and staff',
  'Pricing and revenue model',
  'Risks and controls',
  'What must be ready before launching',
  'What success looks like',
  'Next phase connection',
]
