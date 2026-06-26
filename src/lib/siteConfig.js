// Central content & configuration for Bokgoni Tech.
// Edit copy here — components read from these objects so you rarely touch JSX.

export const contact = {
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '27000000000',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@bokgonitech.co.za',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+27 00 000 0000',
  location: import.meta.env.VITE_CONTACT_LOCATION || 'Pretoria, South Africa',
  hours: 'Mon–Fri 08:00–17:00 · Sat 09:00–13:00',
}

export const whatsappLink = (message = "Hi Bokgoni Tech, I'd like to enquire about a service.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`

// --- Top-level services (cards + /services overview) --------------------------
export const services = [
  {
    slug: 'device-repair',
    name: 'Device Repair',
    short: 'Keeping devices running.',
    problem: 'Broken phone or laptop',
    solution: 'Repair, replace parts, diagnose faults',
    tagline: 'Phone and Laptop Repair',
    icon: 'wrench',
    available: true,
  },
  {
    slug: 'it-support',
    name: 'IT Support & Enhancement',
    short: 'Reliable support and system enhancement.',
    problem: 'Slow, unreliable office technology',
    solution: 'Support computers, Wi-Fi, printers, email and backups',
    tagline: 'Technology that keeps your business running',
    icon: 'server',
    available: true,
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    short: 'Protecting data, devices and business systems.',
    problem: 'Accounts, devices or data are at risk',
    solution: 'Protect access, devices, networks and information',
    tagline: 'Protect your devices, accounts and business information',
    icon: 'shield',
    available: true,
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    short: 'Custom websites, applications and business tools.',
    problem: 'Manual business processes',
    solution: 'Build websites, portals, apps and systems',
    tagline: 'Software built around how your business works',
    icon: 'code',
    available: true,
  },
  {
    slug: 'innovation',
    name: 'Innovation & Automation',
    short: 'Robotics, IoT, AI and automation for the future.',
    problem: 'Repeated work wastes time',
    solution: 'Use AI, automation, IoT and smart systems',
    tagline: 'Future Innovation',
    icon: 'spark',
    available: false, // "Coming as Bokgoni Tech grows"
  },
]

// --- Detailed service-page content -------------------------------------------
export const serviceDetails = {
  'device-repair': {
    headline: 'Phone and Laptop Repair',
    intro:
      'Fast, careful repairs with clear records and a warranty. We diagnose first, quote before any work, and test before collection.',
    serviceList: [
      'Phone screen replacement',
      'Battery replacement',
      'Charging-port repair',
      'Speaker, microphone and camera repair',
      'Back-cover replacement',
      'Software troubleshooting',
      'Laptop screen replacement',
      'Keyboard replacement',
      'RAM and SSD upgrades',
      'Laptop battery replacement',
      'Operating-system installation',
      'Virus removal',
      'Device cleaning and performance improvement',
    ],
    workflow: [
      'Device inspection',
      'Problem diagnosis',
      'Quote provided',
      'Customer approval',
      'Repair completed',
      'Device tested',
      'Customer collection',
      'Repair record and warranty provided',
    ],
  },
  'it-support': {
    headline: 'Technology that keeps your business running',
    intro:
      'We keep your computers, network, email and backups working so your business runs without interruption — on-site or remotely.',
    serviceList: [
      'Computer and laptop support',
      'Wi-Fi and network setup',
      'Printer and scanner support',
      'Microsoft 365 and business email setup',
      'Cloud storage and file sharing',
      'Data backup setup',
      'Software installation',
      'New employee device setup',
      'Business device maintenance',
      'Remote and on-site support',
    ],
    audience: [
      'Small offices',
      'Shops',
      'Schools',
      'Churches',
      'Property businesses',
      'Startups',
      'Professional services',
      'Community organisations',
    ],
    packages: [
      { name: 'Essential Support', for: 'For individuals and very small businesses' },
      {
        name: 'Small Office Support',
        for: 'For businesses with computers, Wi-Fi, printers and email',
      },
      {
        name: 'Managed IT Support',
        for: 'Ongoing monitoring, support, backups and system improvement',
      },
    ],
  },
  cybersecurity: {
    headline: 'Protect your devices, accounts and business information',
    intro:
      'We help reduce cyber risk through practical security controls, monitoring, training and recovery planning.',
    serviceList: [
      'Cybersecurity health checks',
      'Password and MFA setup',
      'Secure business email',
      'Antivirus and endpoint protection',
      'Backup and recovery planning',
      'Secure Wi-Fi and router configuration',
      'Device updates and patching',
      'Employee security awareness training',
      'Account access management',
      'Incident-response planning',
    ],
  },
  'software-development': {
    headline: 'Software built around how your business works',
    intro:
      'From a simple business website to a full job-management portal — we map your workflow, build in stages and support it after launch.',
    serviceList: [
      'Business websites',
      'E-commerce websites',
      'Booking systems',
      'Client portals',
      'Inventory systems',
      'Job-management systems',
      'Internal dashboards',
      'Mobile apps',
      'Payment integrations',
      'Business automation',
      'Custom software',
    ],
    workflow: [
      'Understand the problem',
      'Map the workflow',
      'Design the solution',
      'Build in stages',
      'Test with users',
      'Launch',
      'Support and improve',
    ],
  },
  innovation: {
    headline: 'Future Innovation',
    intro: 'Bokgoni Tech is building toward practical use of:',
    serviceList: [
      'AI assistants and business automation',
      'Smart sensors and IoT systems',
      'Automated reporting',
      'Smart security systems',
      'Robotics education and solutions',
      'Connected business systems',
    ],
  },
}

// --- "How we help" (home page) -----------------------------------------------
export const howWeHelp = [
  { problem: 'Broken device?', answer: 'Repair or replace the affected part.' },
  {
    problem: 'Slow or unreliable business technology?',
    answer: 'Improve computers, Wi-Fi, email, backups and workflows.',
  },
  {
    problem: 'Concerned about data and cyber threats?',
    answer: 'Secure accounts, devices, networks and backups.',
  },
  {
    problem: 'Manual business processes?',
    answer: 'Build a website, app, portal or automation system.',
  },
]

export const businessJourney = ['Repair', 'Support', 'Secure', 'Build', 'Automate']

export const values = [
  'Reliable',
  'Clear',
  'Secure',
  'Practical',
  'Professional',
  'Future-focused',
]

// --- Activity Log categories --------------------------------------------------
export const activityCategories = [
  { value: 'repair', label: 'Repairs' },
  { value: 'it-support', label: 'IT Support Jobs' },
  { value: 'security', label: 'Security Improvements' },
  { value: 'software', label: 'Software Projects' },
  { value: 'update', label: 'Business Updates' },
]

// --- Request-a-service options ------------------------------------------------
export const serviceNeededOptions = [
  'Phone repair',
  'Laptop repair',
  'IT support',
  'Cybersecurity',
  'Website / app / software',
  'Other',
]

export const contactMethods = ['WhatsApp', 'Phone call', 'Email']
