export const headerLinks = [
  {
    label: 'Our Artists',
    route: '/artists',
  },
  {
    label: 'Studio',
    route: '/studio',
  }
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
      { href: '/about', value: 'About IkuVibes' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/', value: '+260 973 548847' },
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Email',
  links: [
    { label: 'Email Officer', value: 'ikuvibes@gmail.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    { link: 'https://web.facebook.com', icon: '/facebook.svg' },
    { link: '/', icon: '/instagram.svg' },
    { link: '/', icon: '/twitter.svg' },
    { link: '/', icon: '/youtube.svg' },
  ],
};
