Title: Node.js, Wheat, and a new Blog
Author: Aaron Fay
Date: Aug 6 2012

I'm excited to finally have this new blog up and running.  It's certainly not much 
to look at right now, but I (again) hope to fill it with insights into the daily
discoveries in my life.  

#### tldr;
Don't deploy node-wheat on heroku, use AWS or something that maintains your `.git` folder.

## A new blog

I'm constantly working on new projects, trying new technologies, and like every 
other developer out there, solving new problems.  It just turns out that I never 
seemed to have time before to really document some of the stuff that I was doing.

Hopefully, this new [platform][] will change that.

[platform]: https://github.com/creationix/wheat

## The Setup

I have looked at [wheat][] a couple times now, and originally I thought it was 
a little 'purist' for a blogging platform, but now, having spent almost a year
developing in [node.js][] for my [last employer][], I'm really looking forward
to putting some javascript down on paper (so to speak).  That, and that fact that
I'm needing to use git in my day-to-day at my new position, [wheat][] becomes 
actually quite obvious as a solution.

[wheat]: https://github.com/creationix/wheat
[node.js]: http://nodejs.org
[last employer]: http://anvydigital.com/

## Try, try again

The only thing I have to say about getting set up with this [platform][] is that
it took way more work than I was originally intending.  Thanks to [Matt Apperson][]
I got a real headstart on the deployment of [wheat][], since there's no one-click-install.

And, I'm lazy.  God I don't really *want* to set up another blog.  I've done it enough.
And I don't want to use Wordpress, I don't want to use blogger (well, I kinda do, but it 
looks like a pain to customize). I just really want to blog, and I want it to do what I 
want, which might be any given thing.  So, here's another shot at all that.

## The Heroku trials

The [heroku][] toolkit is awesome, deployment was a snap, I was really starting to like it, 
but, in the end, it wouldn't work.  *The reason is* that the `.git` folder doesn't end up
on the heroku deployment, and [wheat][] needs the `.git` folder intact to run properly.  

I tried several workarounds, pulling the repo just before running the server, but it
still didn't work out properly. So, in the end, I just deployed to [AWS][], again :)


[Matt Apperson]: https://github.com/mattapperson/blog.mattapperson.com
[heroku]: http://heroku.com/
[AWS]: http://aws.amazon.com/

## Head in the Cloud9

I have been playing with [Cloud9IDE][] as well, and I have to say, other than quite a
bit of 'deploy' wierdness, and some rogue processes, I'm still fairly impressed with it.
If nothing else, it's a really quick way to get your github branch into an editor and 
push some changes.  It has native `node.js` and `git` support, and I look forward to seeing
the product mature.

[Cloud9IDE]: http://c9.io/

## And, just for fun
Here's a code snippet, just to try out the functionality in [wheat][].

<node-wheat-heroku-fail-and-aws/hello-world.js*>

So, there you have it!  Fun times, and good fun.