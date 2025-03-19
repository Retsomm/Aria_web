// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Retsnom-learningCoding',
  tagline: '哈囉，我是Aria，一位正在學習程式語言的人類，雖然討厭人類卻因為身為人類，而不得不學習團體生活，但也渴望能在厲害的團隊中一起打造理想中的產品。我走在自己的人生規劃中，走在自己的時區，儘管緩慢，也在慢慢成長。我是一位高敏感人也是一位左撇子，喜歡伊隆馬斯克並決定要跟他一起死在火星上。' ,
  favicon: 'img/retsnom-favion.PNG',

  url: 'https://docusaurus-web.vercel.app/',
  baseUrl: '/',

  organizationName: 'facebook', 
  projectName: 'docusaurus', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      }),      
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-7KJZMT5GD8', 
        anonymizeIP: true, 
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'KOYF7XQ73V',
        apiKey: '00759781d7603d19b126467e6cb509b9',
        indexName: 'aria-web-theta',
        contextualSearch: true,
        debug: false,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Retsnom Logo',
          src: 'img/retsnom-logo.PNG',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Note',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: 'https://proud-wax-361.notion.site/78fcfde5dd5346568974db8628e33763?v=2d22870525f4456987760bdb7305133f&pvs=4', label: 'Reading', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Note',
                to: '/docs/intro',
              },{
                label: 'Blog',
                to: '/blog',
              },{
                label: 'Projects',
                to: '/projects',
              },{
                label: 'Reading',
                to: 'https://proud-wax-361.notion.site/78fcfde5dd5346568974db8628e33763?v=2d22870525f4456987760bdb7305133f&pvs=4',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/retsnom-z-96703120a/',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/reading_retsnom',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Retsomm',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docusaurus GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Retsnom, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['sass'],
      },
      metadata: [
        { name: 'google-analytics', content: 'G-7KJZMT5GD8' },
      ],
      scripts: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-7KJZMT5GD8',
          async: true,
        },
        {
          src: '/gtag.js',
        },
      ],
    }),
};

export default config;
