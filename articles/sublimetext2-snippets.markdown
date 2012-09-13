Title: SublimeText 2 Snippet for ko.computed
Author: Aaron Fay
Date: Sep 13 2012

If you're not using [SublimeText2][], you really don't know what you're missing...
Just head on over to the [home page][] and see a few of the features that make 
this just a fantastic editor.  I won't go into detail just yet...

[SublimeText2]: http://www.sublimetext.com/2
[home page]: http://www.sublimetext.com/2

## Snippets
What I wanted to write about today is snippets.  The snippet system in [SublimeText2][]
is quite... well... _sublime_. But I was originally having trouble getting them to work (or
so I thought).

My snippet (javascript) looked like this:

    <!-- Note: not actually working -->
    <snippet>
      <content><![CDATA[
    ${1:self}.${2:method} = ko.computed(function () {
      ${3:// content}
    }, ${1:self});
    ]]></content>
      <tabTrigger>comp</tabTrigger>
      <scope>source.javascript</scope>
    </snippet>
    
... and what I failed to realize was that the `source.javascript` line should 
actually by `source.js`.  Ah well, problem solved.

    <!-- Working, hooray! -->
    <snippet>
      <content><![CDATA[
    ${1:self}.${2:method} = ko.computed(function () {
      ${3:// content}
    }, ${1:self});
    ]]></content>
      <tabTrigger>comp</tabTrigger>
      <scope>source.js</scope>
    </snippet>
    
### What this snippet does
The snippet in question is for firing off blazing fast `ko.computed` definitions.
By typing `comp<tab>` you get a bit of code that looks like this:

    self.method = ko.computed(function () {
      // content
    }, self);
    
To start with, both `self`s are highlighted, as per Sublime Text 2's multi-select
style.  Sweet.  Hit `<tab>` and we jump to `method` selected, fill that in, hit 
`tab` one more time, and now `// content` is the current selection, fill in to finish.

This snipped can be got [here][].


> Tip: can't find your `Packages` folder?  In Sublime Text 2, select `Preferences > Browse Packages` and browse to the `User` folder.

Cheers,
Aaron

[here]: https://gist.github.com/3717681
