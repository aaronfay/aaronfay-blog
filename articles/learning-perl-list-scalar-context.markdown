Title: Learning Perl, List and Scalar context note  
Author: Aaron Fay
Date: Oct 30 2012

Today I ran across an interesting feature of Perl, as I was trying to test a variable key against a hash, essentially a key search.  I'm still surprised at how accessible things are in Perl when I go to do something complicated, I find there is usually a very simple way to do it, clearly by design.

## An Example
Searching against a set of keys in perl is quite simple, given the following hash:

    %foo = (
      'bar' =>'baz', 
      'biz'=>'bad', 
      'bat'=>'buz'
    );

... testing for a key match is quite simple:

    $match = grep {/bar/} keys %foo;
    print $match; # prints '1'

### Up the ante
For a bit of code that I'm working on, I need a little more complicated search though, I'm testing a dynamic string against the set of keys for a given hash, turns out the answer is equally simple:

    $search_string = 'bar';
    $match = grep {/$search_string/} keys %foo;
    print $match; # prints '1'
    
Pretty straight forward.  This example doesn't really give a lot of power just yet, mostly because the regular expressions are over-simplified.  It was in my next example that the nature of `list` and `scalar` context started to become clear to me in Perl.  According to [this page on the perldoc site](http://perldoc.perl.org/functions/grep.html), "[grep] returns the list value consisting of those elements for which the expression evaluated to true. In scalar context, returns the number of times the expression was true."

This is neat.  In the first example below, we get the match count, and the second, we get a list of matches from the same `grep`.  The only difference is the context assignment, denoted by `$` or `@`.
    
    # get results in scalar context
    $moo = grep {/^b/} keys %foo;
    print $moo; # 3

    # get results in list context
    @moo = grep {/^b/} keys %foo;
    print @moo; # batbarbiz

## Scalar wha..?
[This article](http://www.comp.leeds.ac.uk/Perl/scalars.html) describes a _scalar_ as the "most basic kind of variable in Perl... [they] hold both strings and numbers, and are remarkable in that strings and numbers are completely interchangable."  Maybe remarkable if you are coming from C, or a strict language where dynamic typing is not allowed.

### A little deeper
A **scalar** turns out to be just a _variable_, but one that can only hold a _single value_.  If you need more than one value, you need a list, and a lookup, you need a hash.  Scalar variables in Perl can be a number, a string, even a reference to a more complicated type.  In the the case of an [array reference](http://www.thegeekstuff.com/2010/06/perl-array-reference-examples/) or a [hash reference](http://www.thegeekstuff.com/2010/06/perl-hash-reference/), you can think of the scalar variable as a _pointer_ to the original object, which can be merrily passed around at will.
    
    %hash = ('foo'=>'bar'); # my hash
    $ref = \%hash; # $ref is a hash reference

    $obj->my_sub($ref); # pass the reference to a subroutine

This language is wierd.  [Larry Wall](http://en.wikipedia.org/wiki/Larry_Wall) must have thought he build the best thing ever when he created Perl.  If feels a lot like `vim`, except that you have about 6-10 possible ways to do any given command.  **TIMTOWTDI** is a great mindset for a language in terms of flexibility, but as soon as you get into someone else's code, you realize you don't know anything about the language again.

Until next time,
Af