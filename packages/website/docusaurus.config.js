module.exports = {
  title: "Better Deposits",
  tagline: "Take back control of your finances",
  url: "https://betterdeposits.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "hack-money", // Usually your GitHub org/user name.
  projectName: "betterdeposits", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Better Deposits",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "FAQs",
          position: "left",
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "FAQ",
              to: "docs/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/hack-money/betterdeposits",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tom French and Tom Waite.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "faq",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/hack-money/betterdeposits/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/hack-money/betterdeposits/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
