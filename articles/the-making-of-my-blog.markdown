Title: Building my blog, the choices I made in tech
Author: Matt Apperson
Date: Dec 14 2011

About 2 weeks ago, I decided to invest some time into re-developing my tools I use in my everyday work, and some things to help me expand my current tech toolset. So over the next few weeks I will be blogging about the new tech I am picking up in my everyday workflow. One of those things was my blog. 

They say when you learn, one of the steps to learning it to teach what your learning. Also as I work as a Community Engineer at Appcelerator, I figure that its part of my "job" as it were to relay what I am learning to those in the community about not just Titanium Mobile, but also related tech like node.js.

So let's get to it then!

## What's it made of?

So I knew going in I did not want to use the normal standby of Wordpres... this is not because I dont like it as a piece of software, in fact I have built a large number of sites with it. The reason I wanted something else was to both use new tech, bus also intigrate better in my workflow. I wanted something that used Markdown rather then hard coding HTML or using a WYSIWYG editor.

My first thoughts were to use Python, or Node.js... I am not a fan of ruby, and while there is nothing wrong with PHP... the more i use JS and python everyday, the more I feel like PHP is just a tad clunky for something like this.

Python Also would have been good, but at the end of the day, I use JS all the time, and to be honest I feel like soon JS will be what Ruby and PHP have been for years now. So JS it was.

Now that I had a language, I had to choose a storage method. I knew MySQL was out of the question, I have just never been a fan of writing SQL queries... so I immediately jumped to the idea of MongoDB... I LOVE MongoDB so to me it was just the right idea. Only about 2 hours in to developing this new NodeJS / MongoDB blog however, I remembered an old bookmark I had... someone had used Git to store flat files of articles for their blog. This was perfect for me! Git is already a major part of my workflow, and so made sense to use that, rather then a web based editor... this way I can write when offline, and just push up when I am ready! Not only that, but a quick google search lead me to howtonode.org, they had already come up with the code needed, it was so simple!

In the end, its not a perfect solution for everyone, it's extreamly basic in features, but for me it was perfect! :)

My blog on GitHub - [https://github.com/mattapperson/blog.mattapperson.com](https://github.com/mattapperson/blog.mattapperson.com) (a fork of [howtonode.com](http://howtonode.org) Thanks guys!)
