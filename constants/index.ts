export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  imageUrl: '',
  createdAt: new Date(),
  genre: '',
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      'About Mellow',
      'Press Releases',
      'Jobs'
    ],
  },
  {
    title: 'Our Community',
    links: ['Artists', 'Promotions', 'Recording Studio'],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Admin Officer', value: '+260 973 548847' },
    { label: 'Email Officer', value: 'mellowmusic@mellow.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    '/facebook.svg',
    '/instagram.svg',
    '/twitter.svg',
    '/youtube.svg',
  ],
};
