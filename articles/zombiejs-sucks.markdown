Title: Zombie.js just sucks
Author: Aaron Fay
Date: Aug 28 2012

<div class="alert-message block-message">
__Note__: **Zombie.js has had several new releases since I wrote this post.** I've
caved in and tried it again, and the newer version of Zombie seems to be working
out better than previous versions. Future post to come.
</div>

## Zombie.js

I've been waiting for quite a while to try out [zombie.js][].  It seems like the 
"End All." of hard-to-test-super-complex-setup systems, for instance, a system
where you have a SSO with several redirects, then multi-panel single page app
with a lot of ajax requests and dynamic resources.  Unit tests are one thing, but
I really wanted to test that the whole setup was going to perform as expected.

## #epicfail

After a day and a half (and part of an evening), I think that [zombie.js][] is 
probably trying to be a little too magical.  On my [Vagrant][] box (Ubuntu Precise
server) I'm running Node v0.8.6.  At first I tried the setup with [Mocha][] as 
prescribed in the [docs][], but to no avail.  The biggest problem: our SSO
system does a couple redirects when you hit the application page, and just like
another user expressed in [this discussion][], my `.then()` callback fires way
too prematurely, and never hits the actual redirect. Specifying the wait time 
didn't help any either.

## Frustration at it's finest

I'm not one to give up, I rarely let a hard problem get by me, but this isn't 
just a 'tricky' API I think.  I think it's an immature project.  Harsh, I know, 
but have a look at this example:

    var zombie = require('zombie')
      , browser = new zombie.Browser
      ;
    
    browser.load('<html />', function () {
      console.log('foo')
    });


According to the [documentation][], `browser.load`...

> Loads this HTML, processes events and calls the callback.

But it actually gives: 

    TypeError: Object #<Browser> has no method 'load'
        at repl:1:10
        at REPLServer.self.eval (repl.js:111:21)
        at Interface.<anonymous> (repl.js:250:12)
        at Interface.EventEmitter.emit (events.js:88:17)
        at Interface._onLine (readline.js:199:10)
        at Interface._line (readline.js:517:8)
        at Interface._ttyWrite (readline.js:735:14)
        at ReadStream.onkeypress (readline.js:98:10)
        at ReadStream.EventEmitter.emit (events.js:115:20)
        at emitKey (readline.js:1057:12)

Am I just doing something plain wrong?  

### So the tally is...
__Zombies 1, Aaron 0__

As a side note, [selenium][] is looking to do exactly what I want.

[zombie.js]: http://zombie.labnotes.org/
[Vagrant]: http://vagrantup.com/
[docs]: http://zombie.labnotes.org/
[Mocha]: http://visionmedia.github.com/mocha/
[selenium]: http://seleniumhq.org
[this discussion]: https://groups.google.com/forum/?hl=en#!searchin/zombie-js/redirect/zombie-js/ng2biQw6u5w/Ch_WcL_PFkMJ 
[documentation]: http://zombie.labnotes.org/API#browser-load-html-callback
