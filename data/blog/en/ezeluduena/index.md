---
title: 'Creating a Personal Website'
date: '2024-10-13'
description: 'In this blog, I discuss how I created my personal portfolio and blog using an open-source website. I mention the features I was looking for, how I adapted them, and how I added the missing ones.'
comment_section_title: 'Creating a Personal Website' 
---
When you start looking for a job in programming or technology, you face a big challenge in getting hired: the lack of work experience.

Without any prior jobs to validate the skills you claim to have, you need other ways to stand out and convince potential employers that hiring you is a good idea. One of these methods, which appears everywhere on the Internet, is having a web portfolio.

With this goal in mind, and the desire to have my own website, developed and maintained by myself, I decided to start this project.

## Features

Just when I had this idea in my head, I came across this [video](https://youtu.be/nIracKeqsFk?si=2Q0Ut6z6aCuUITEA), which I found very good and helped me define the following features for my website:

- Personal presentation.
- Links to social media and contact methods.
- Showcase of completed projects, explaining how they were developed.
- A blog section.
- Ability to switch between different languages.

## Tyrrrz.me

While looking for inspiration in the open-source list [developer-portfolios](https://github.com/emmabostian/developer-portfolios), I found the page [tyrrrz.me](https://tyrrrz.me/), which had a simple aesthetic that I liked and fulfilled almost all of the main features I was looking for, plus some other interesting ones.

At that moment, I thought: why reinvent the wheel and face the learning curve of frontend development with a page that will directly impact my job opportunities?

So I decided to fork the repository, adapt it to my needs, and add the option to change the page's language, which was the only missing feature.

## Implementation

This page uses the following technologies:

- Next.js
- React
- Typescript
- TailwindCSS
- Node.js

After several hours reading the code, consulting the documentation, Googling, and testing the page, I managed to understand the different features and how they work. This allowed me to identify the necessary changes to adapt and personalize the site to my needs.

### Language Selection Button

In order to increase the reach and opportunities the website can generate, I thought it was essential for the site's content to be available in English, in addition to Spanish. The go-to option for this kind of task is using the framework [i18next](https://www.i18next.com/), but its implementation is only straightforward in dynamic websites, and as I will explain later in the section [Deploy and Domain](/blog/en/ezeluduena#deploy-and-domain), I needed my page to be static.

To overcome this challenge, I decided to replicate the framework’s mechanism by using a dictionary to store the text of each section in Spanish and another to do the same in English.
Then, the various page components query these dictionaries to load the appropriate text based on the language.

To select the correct dictionary, I used a `React` hook that detects the browser's preferred language but also allows manual language switching and saves the selected one.

Regarding the blog posts, I chose to have two separate files with the full content in each language, accessible through different routes, and using the hook to automatically redirect to the correct one based on the selected language.

The language switch is activated through a button located at the top of the page, to the right of the dark/light mode toggle. The icon was obtained from [The Noun Project](https://thenounproject.com/), and I used Inkscape to add the "En" and "Es" labels.

Although this implementation does not offer the scalability of `i18next` for adding or removing languages, it was relatively simple to implement and is enough for my current needs.

## Deploy and Domain

Since the original project was deployed with [Vercel](https://vercel.com/), and this service has great compatibility with Next.js and Node.js, it was easy to upload it to my account, integrate it with the repository, and automate the process so that after each commit to the `master` branch, the changes would quickly reflect on the website.

### .dev.ar Domain

While talking to a friend about this idea, he mentioned that `.dev.ar` domains were available for free. I wasn’t sure what the best domain for the site would be, and this option allows for a more appealing link, one that doesn’t include any hosting service names.

[Here’s the link](https://home.dev.ar/) where you can request the domain for free. They only ask for an email, and they promise not to sell it to anyone.
The site explains that maintaining the project doesn’t take much effort and that they do it to contribute to the development of other Argentine programmers. I’ll also leave [this link](https://github.com/pragmore/dev.ar) to the app repository they use to manage the subdomains.

The only downside I found was that they don’t offer verification through a `TXT` record, which is necessary to set up a custom domain on Vercel and other providers. `TXT` records are used, among other things, to verify domain ownership in DNS systems.
Without this option, if I wanted to use this domain, I had to change the hosting method. Since the documentation explains how to use the domain with `GitHub Pages`, I decided to move the site to that service.

### Github Pages

Github offers a free hosting service, directly from the repository, for static websites. It’s easy to set up, and as mentioned before, `.dev.ar` domains are supported for this service.

The biggest challenge was modifying the site’s logic so that it could compile and run statically. Fortunately, following [this tutorial](https://www.youtube.com/watch?v=mJuz45RXeXY) on how to deploy a Next.js app on GitHub Pages, it turned out to be a relatively simple process.

To handle automatic deploys and dependency updates, I used `GitHub Actions` and `Dependabot`. [Here](https://github.com/ezeluduena/ezeluduena.dev.ar/tree/master/.github) you can see the respective configuration files.

### Vercel

Despite changing the main hosting service, I kept Vercel to take advantage of automatic deploys for each branch of the repository. This was very useful to automatically see the changes I was adding while maintaining a production branch and a development branch, where I implemented the language change. Additionally, this service provides comments and automatic deploy tests for each pull request created.

## Features Summary

This was my journey developing the page you're reading this on. Here's a summary of its features in case you want to use and adapt it to your needs:

- Home page with personal introduction and photo.
- Projects page.
  - Brief description of each project.
  - Technologies used.
- Blog.
  - RSS feed.
  - Reading time calculator.
  - Comments and reactions with a GitHub account, using [Giscus](https://giscus.app/en).
- Social media links at the bottom of each page.
- Light and dark mode.
- Support for two languages (English and Spanish).

If you’ve made it this far, I invite you to comment on what you would change or add to the site. Any feedback is appreciated.

Here’s the [link to the repository](https://github.com/ezeluduena/ezeluduena.dev.ar). Thank you very much for reading 😊.
