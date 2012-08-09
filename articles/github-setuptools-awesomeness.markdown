Title: Github, Setuptools, and What I Leared Today
Author: Aaron Fay
Date: Aug 8 2012

How's that for a title?  I just have to say, [git][] is pretty awesome, but I'm assuming you knew that.  I read an article today where (for the first time I've seen) someone was making a case for [bazaar][] over git.  I used [bazaar][] for our development team for almost two years, it was my "upgrade" to "distributed" over subversion. Sorry, can't find the article. In a nutshell, 20 out of dvcs users [on that webpage] prefer git over bzr.  Maybe corn flakes too...

## tldr;
Click the little 'X' in the upper-right corner...

## good, bad, indifferent
I'm not really going to argue points about the two systems today, all I'll say is that I'm totally digging git. And my motivation is several-fold:

 * [Video][] - __Summary__: Linus Torvalds tells Google staff how stupid they are 'coz they don't use git... over and over and over again.
 * Like, the internets use github, both of them, duhh
 * I get to use it at work :)

[git]: http://github.com
[bazaar]: bazaar.canonical.com
[Video]: http://www.youtube.com/watch?v=4XpnKHJAok8

### Further rationale
Bazaar was great, don't get me wrong, but some of my newest most favorite features are (in no particular order):

 * [On-the-fly branching!](http://www-cs-students.stanford.edu/~blynn/gitmagic/ch04.html)  How cool is that?? In bzr (or svn) a branch would require a different folder.  In-place branches are wicked.
 * [Submodules](http://git-scm.com/book/en/Git-Tools-Submodules) Is there another system where this actually works?
 * [Rebase](http://git-scm.com/book/en/Git-Branching-Rebasing) OMFG nuff said.

There's more, but that's on the top of my list right now.

## mixin(setuptools)
One of the neat things about settling in with a new development team is the things that I learn.  At the top of my list are:

 * the things I've been doing right,
 * the things I've been doing wrong.

 Of the latter, the first that comes to mind is [setuptools][]. I've been managing Python dependencies manually for the last several years, in my mind, somehow, convinced that efficient dependency management in Python was somehow flawed, or "seldom agreed upon".  Probably a result of me being in a hurry most of the time.

Thankfully, I've seen the light!  A colleague at work turned me back on to [virtualenv][], and I now realize what I've been missing in python all along: __a reliable, simple deployment strategy__.  I'll have to write more on that workflow later.

[setuptools]: http://pypi.python.org/pypi/setuptools/
[virtualenv]: http://pypi.python.org/pypi/virtualenv/

## mixin(git)
This part is my favorite: without too much trouble, you can configure setuptools to pull from a github repo (or probably any other repo).  There are only two criteria:

 * The remote project must be [setuptools-compatible][]
 * The endpoint must provide a tarball (equivalent to an .egg)

[setuptools-compatible]: http://packages.python.org/an_example_pypi_project/setuptools.html#setting-up-setup-py

In the `setup.py` you only need specify the tarball location in a specific way in the `dependency_links` kwarg.

Eg: 

```python

from setuptools import setup

...

setup(
    name = "my-project",
    version = "1.0.0",
    author = "Aaron Fay",
    author_email = "me@gmail.com",
    description = ("Simple python setuptools package."),
    license = "BSD",
    keywords = "example python package setuptools",
    url = "http://my.url",
    packages = ['an_example_pypi_project',],
    long_description = "My description"
    install_requires = [
        'my_other_package==1.0.0' ## look here!
    ],
    dependency_links = [
        'https://github.com/AaronFay/my-other-package/tarball/master#egg=my_other_package-1.0.0'
    ]
)

```
The trick in all this is the `#egg=my_other_package-1.0.0` part, setuptools will recognize the package name and match it up with a required package in `install_requires`.  It even has a pretty smart way to [differentiate package versions](http://packages.python.org/distribute/setuptools.html#specifying-your-project-s-version).

### wrapping up
Without too much trouble, a very efficient development/production workflow can be set up with the combination of virtualenv, git, and setuptools.  It's definitely an exciting time to be in software development.

Until next time.

af