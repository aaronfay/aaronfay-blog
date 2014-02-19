title: Revitalizing the blog with Hexo, Concrete, and PM2
date: 2014-02-18 22:00:00
tags: 
 - ci
 - nodejs
---

Just a super-geeky post. I was using [node-wheat][1] for blogging for a while because it was super-easy to set up, and would just operate off a git repo. Pretty cool, but I never got the time to add some of the features I wanted, and it doesn't appear to be maintained any more, despite it's coolness.

Anyway, I just converted the blog to [hexo][2] which is very similar (uses markdown as well) but has some super-sweet features, namely [gists][3], [jsfiddle][4] integration, and [some other fun stuff][5]. On top, it [generates][6] all the static files so the site is super-fast.

The setup
---------

 * [Github][7]: basically my editor, accessible anywhere
 * [DigitalOcean][8]: $5 hosting, full control
 * [Hexo][2]: blog engine, some really excellent features (for a programmer)
 * [Concrete][9]: super simple ci server, hovers the repo and gets notifications from Github, regenerates static files with hexo
 * [node-static][10]: actually serves the site
 * [pm2][11]: kickass process monitor for node, think `supervisor` if you're from python-land but with some neat features.

That's it. Super-simple setup, easy to maintain, updates automatically, and no plugins to get hacked and create spam :) Hopefully with some new shiny I will make more time to blog about current challenges.

[1]: https://github.com/creationix/wheat
[2]: http://zespia.tw/hexo/
[3]: http://zespia.tw/hexo/docs/tag-plugins.html#gist
[4]: http://zespia.tw/hexo/docs/tag-plugins.html#jsfiddle
[5]: http://zespia.tw/hexo/docs/tag-plugins.html
[6]: http://zespia.tw/hexo/docs/generating.html
[7]: https://github.com/aaronfay/aaronfay-blog
[8]: https://www.digitalocean.com/
[9]: https://github.com/ryankee/concrete
[10]: https://github.com/cloudhead/node-static
[11]: https://github.com/Unitech/pm2
