title: The problem with MVC
date: 2012-08-30 12:00:00
categories:
 - programming
tags:
 - mvc
 - javascript
---

I'm a modern-day hack: I read a bit, books and online, I mash together chunks of code and frameworks to try and make things work (or break), I like to try things that few have attempted, with pretty decent success.  For the longest time I didn't feel entirely comfortable in my shoes as a "programmer", meaning that I was writing code, my shit was working, but I felt I never met the generally-accepted criteria of a modern programmer.  One of the things that kept me feeling unworthy was my lack of the use of teh ["MVC"][1] in my works.


## Model-View-Controller
I'm not going to go too far into what [MVC][1] is, if you're reading this, then you already have a good idea already. Besides, there are [internets][] out there to tell you what it is. I'm here to talk about why you should be using it.


__The problem with MVC is that it's *misunderstood*.__

Misunderstood for several reasons:

 * because I think the term itself has become a [buzzword][]. To the layperson or aspiring programmer, the concept of MVC is just another term among a slew of catch phrases that one encounters trying to decode the mystery of developing for the web, 
 * next, it seems every new framework that totes the label 'MVC' isn't really a true representation of the pattern, or else it's some derivation of MVC that still doesn't really explain what it is.
 * last, MVC can be hard, or at least hard to pick up and understand.  Let's look at an example of that next.

## Picking on someone...
Take the Actionscript framework [Robotlegs][], for example.  There are several key components to setting up a project with that framework ([have a look at their flow diagram](http://www.robotlegs.org/diagram/)):

 * Views
 * Mediators
 * Context
 * Commands
 * Actors
 * Services

Don't get me wrong, [Robotlegs][] is a great framework, but it's no wonder people are confused!  Before successfully getting a project off the ground with Robotlegs, I think it took me 2 or 3 attempts to get my head wrapped around the minimal requirements. I mean, in all of this, which one is the Model?  Where's the Controller?  There isn't even a 'View' class in Robotlegs.

*It felt like pulling teeth to really 'get it'.*

## If it's so crazy, then why use it?

Lots of times when I read about MVC, I see lots of words like "clean code separation", "visual flexibility", "better workflow", etc.  I think everyone who has thought about MVC but isn't using it yet needs that last little bit to really convince them:

__MVC is about *sanity*.__  

Sanity because and MVC or similar (MVVM, MVCS, MV*) pattern helps you separate your application layers, which, without practice, is hard to do.  But without regurgitating all the other buzz words and phrases to try and convince you it's worth using, let's make up a new idea about MVC:

> 
> __*Data state representation bindings.*__
> 

Let me clarify that: __bindings that automatically change the interface to represent the state of the data__.  This means (in the case of a browser
or something similar) that when you click an item, you don't reach in with your code and change the page or another element on 
the page, you change your data instead.  And if you have your bindings set up properly (or your framework for that matter), then 
the view updates for you.  With this kind of setup you can wire as many views to a single piece of data as you want, and in order
to update them all, you only need change the state of the data, and they will all automatically update.

See? _Sanity_.  

### Time to grow up...
If you're not using some MV -ish framework or some kind of bindings for your project, there will never be a better
time than now.  You owe yourself a little sanity, take the plunge.  You'll thank yourself in the end.

_af_


[1]: http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[internets]: http://en.wikipedia.org/wiki/Internets
[buzzword]: http://en.wikipedia.org/wiki/Buzzword
[Robotlegs]: http://www.robotlegs.org/
