Title: The problem with MVC
Author: Aaron Fay
Date: Aug 12 2012

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

That's what MVC really is: some representation of the state of a piece of data.  The 'bindings' part means that if the data state changes (meaning the data changes period), then anything bound to that data (the views) updates accordingly.  

Let's take the browser, for instance.  Every one of us has built an application that did exactly this:

 * User clicks a button to add a new item to a list
 * `click` handler grabs some text/value from the text input and appends the new list item
 * Once the new list item is in place, count how many `<li>`s are in the '<ul>'
 * Put that count in another part of the page `<span id="total-items"></span>`

In this example, we have basically one click handler and callback, pretty simple:

    // register the click handler
    $('#my-button').click(function () {
      var val = $('#my-input').val();
      var newLI = $('<li/>');
      newLI.text(val);
      $('#my-list').append(newLI);
      var count = $("#my-list > li").size();
      $('#totals').text(count);
    });

If that were all you ever had to do, then that's fine, app's done, go home.  But that's not really a 
web app, is it.  Let's say you need a new feature: remove an item from the list by clicking on it.

Now there's another click handler:

    // register listener for removing item
    $('#my-list > li').click(function () {
      
    });

This also means that you need to think about how 




[1]: http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[internets]: http://en.wikipedia.org/wiki/Internets
[buzzword]: http://en.wikipedia.org/wiki/Buzzword
[Robotlegs]: http://www.robotlegs.org/
