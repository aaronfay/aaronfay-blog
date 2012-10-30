Title: On learning Perl and TDD
Author: Aaron Fay
Date: Oct 29 2012

I want to start off by saying that `Perl` has to be one of the most _fantastic_
languages I've every had to work in.  I'm not really learning it because I have
a keen interest in Perl, I'm learning to be helpful regarding the legacy codebase
at [my work](http://strathcom.ca/).

## A little grind goes a long way...
I wrote a bit of a script, after spending a few weeks perusing through a hefty 
codebase, and even with a little bit of [Programming Perl][] under my belt, I 
still don't have the skill to just roll out a lot of code off the top of my head. To 
make sure I was putting some test coverage in place (of which there isn't in
this particular project), I looked up `Test::Simple` and `Test::More` and started
the file that would house my tests.

I found after I have covered the existing code that I was looking at my new 
function stubs, and wondering how to best describe what they were going to do. Without 
even really thinking about it, I started writing tests to say, "It should
do this, or that" and in a couple minutes I had created a [spec][] for the 
function I was writing. 

## Almost like fun
The neat thing is, having the spec in place allowed me to play with the code a
little bit to see if it was doing what I wanted when I tried different things.  
If you recall, Perl has that "There Is Moar Than One Way To Do It"(TM) thing, 
which can be a good and a bad thing, but more about that later.  

The real fun is when I made the realization that I was actually doing [Test Driven Development][] 
to learn Perl. [TDD][] is something I've always thought would benefit my coding
style, but I never really realized how until today.

Until next time,
Af


[Programming Perl]: http://shop.oreilly.com/product/9780596000271.do
[spec]: http://en.wikipedia.org/wiki/Behavior-driven_development
[Test Driven Development]: http://en.wikipedia.org/wiki/Test-driven_development
[TDD]: http://en.wikipedia.org/wiki/Test-driven_development

