## Gatsby Icarus Theme Starter - Kun's Blog

[![GitHub license](https://img.shields.io/github/license/calpa/gatsby-starter-calpa-blog.svg)](https://github.com/Kun8018/gatsby-starter-icarus-blog/blob/master/LICENSE)
[![Accept Pull Requests](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Kun8018/gatsby-starter-icarus-blog/pulls)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/calpa/gatsby-starter-calpa-blog.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fcalpa%2Fblog)
[![Greenkeeper badge](https://badges.greenkeeper.io/calpa/gatsby-starter-calpa-blog.svg)](https://greenkeeper.io/)
[![Build Status](https://api.travis-ci.org/calpa/gatsby-starter-calpa-blog.svg?branch=master)](https://github.com/Kun8018/gatsby-starter-icarus-blog/blob/master/.travis.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/69c4fc63-9bed-44e4-aee4-77ceb456f770/deploy-status)](https://app.netlify.com/sites/calpa/deploys)

[简体中文](README-zh-Hans.md) | [English](README.md)

![Home Page](https://imgur.com/Yf3mnfR.png)

Build a blog system like [Kun's Blog](https://kunzhang.me) in ease.

If you like this project, please don't hesitate to star it. Thank you.

## Feature

### Structure

1. GatsbyJS v3, faster than faster
1. Google Analytics
1. Offline support
1. Web App Manifest
1. Page pagination
1. Netlify optimization
1. Awesome comment component (powered by [Gitalk](https://github.com/gitalk/gitalk))
1. Search Engine Optimization
1. Parse Markdown in high speed (powered by [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/))
1. Support to sitemap
1. Download as a desktop App
1. Support typescript
1. Support Editing with Notion(RoadMap)
1. Support Search inside Site(RoadMap)

### Design

1. Pagination
2. Different Tags
3. Responsive Web Design
4. Font Awesome is auto loaded (powered by [react-fontawesome](https://github.com/FortAwesome/react-fontawesome))
5. Scroll smoothly (powered by [smooth-scroll](https://github.com/cferdinandi/smooth-scroll))
6. theme-like Icarus in Hexo

### Data Source

You can edit the posts in `/src/content/*.md`, or using Netlify-cms to edit the posts.

### Customization for developers

1. Optimize code
1. Styled using SCSS
1. Data Source

## Get Started

### Deploy with Netlify

Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/Kun8018/gatsby-starter-icarus-blog" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template.

Next, it will build and deploy the new site on Netlify, bringing you to the blog system when the build is complete.

## Prerequisites

1. Git
1. Node: 12.0.0 or higher
1. A fork of the repo (for any contributions)
1. A clone of the this repo on your local machine

## Develop

How to start this project?

1. Install Gatsby-CLI

```
npm install --global gatsby-cli
```

2. Create new Gatsby project using this starter, `new-blog` is your blog's folder

```
gatsby new new-blog https://github.com/Kun8018/gatsby-starter-icarus-blog

## 使用ssh
gatsby new new-blog git@github.com:Kun8018/gatsby-starter-icarus-blog
```

3. Open the folder

```
cd new-blog
npm install
```

4. Run Development Server

   1. `npm start` to start the hot-reloading development server (powered by [Gatsby](https://www.gatsbyjs.org/))
   1. `open http://localhost:8000` to open the site in your favorite browser

## Configuration

Edit the export object in `data/config`

Note: [To look up theme_color hex code, click here.](https://www.colorhexa.com/)

```JavaScript
module.exports = {
  title: 'your blog title here',
  maxPages: 12
  meta: {
    description: 'blog description',
    keyword: 'blog, JavaScript',
    theme_color: '#hexcode',
    favicon: 'https:yourimageurl.com',
    google_site_verification: 'your google verification hash',
  },
  name: 'your name',
  email: 'your_email@gmail.com',
  iconUrl: 'https://youricon.jpg',
  License: 'by',
  url: 'https://yourblog.me',
  about: '/2018/05/01/about-your-name/',
  // Sidebar
  zhihuUsername: 'your zhiu user name here',
  githubUsername: 'your github user name here',
  friends: [
    {
      title: 'friend title',
      href: 'link to their blog',
    }
  ]
```

Plugins in the configuration file:

```JavaScript
gaOptimizeId: 'GTM-WHP7SC5',
gaTrackId: 'UA-84737574-3',
navbarList: [
  {
    href: '/stats/',
    title: 'stat title',
  },
  {
    href: '/tags/',
    title: 'tags',
  },
  {
    href: '/guestbook/',
    title: 'guestbook',
  },
  {
    href: '/2018/10/04/about-your-blog/',
    title: 'your title',
  },
],
redirectors: [
  {
    fromPath: '/',
    toPath: '/page/1',
  },
],
```

Gitalk plugin configuration

```JavaScript
gitalk: {
    clientID: '',
    clientSecret: '',
    repo: 'Kun8018.github.io',
    owner: 'Kun8018',
    admin: ['Kun8018'],
    distractionFreeMode: true,
  },
}
```

## Deploy

[Kun's blog](https://kunzhang.me) is currently using Netlify, though, you may use Github Pages as an alternative.

- Github Pages

  `npm run deploy` to deploy the blog to Github Pages

- Netlify

  Auto Deploy

## Troubleshooting

- For `window is defined`, wrap the require in check for window:

  ```JavaScript
  if (typeof window !== `undefined`) {
    const module = require("module");
  }
  ```

- `npm run reset` to clear the local cache
- Check [GatsbyJS Debugging Docs](https://www.gatsbyjs.org/docs/debugging-html-builds/)

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for more information.

And don't hesitate to put your star and watch this starter project.

## Contact

If you are interested in this project, please feel free to contact [Kun8018](1027690173@qq.com).

Thanks For Contribute... :)

![Alt](https://repobeats.axiom.co/api/embed/3e890301e987ab9bbbc60dc9d22ad8530f370077.svg "Repobeats analytics image")
