Title: setuptools, pip, and custom python index
Author: Aaron Fay
Date: Jul 13 2013

In modern-day software development for the web I find that we end up trying many different ways to deploy code. While [at work](http://strathcom.com/) we're using python as our primary programming language, I've enjoyed the [node.js philosophy][1], especially the practice of [Small Kernels of Functionality][1] and [Loosely Coupled Components][1]. 

From [the article][5]:

 > "...why package two modules together if you can simply break them apart into two kernels of functionality which are codependent?""

Problem
---
One of the core sore points for me right now is the existence of "common" libraries in our work. It's common to have a piece of code that is needed in the current project, but doesn't particularly belong there. The approach (I often see) is to create said "common" library and deploy that with all of the projects that need the code.

The problem with is many-fold though:

 * dependency chains are not explicit,
 * the "common" library grows over time,
 * the same library becomes disorganized,
 * it's not clear later on how to break things out because it's not clear what projects are using what parts of the library,
 * the library with all theses different pieces of functionality [breaks the rule of single responsibility][6].

Back to the [node.js philosophy][1], if you've ever used [npm][2] before, you know that there are [tons and tons of modules][3] available for node (as an interesting sidenode, npmjs module counts are growing by 94 modules/day at the time of writing [[link][3]]). The recommended approach is to keep modules small, and publish them independently so they can be used explicitly across applications. [James Halliday writes about this approach on his blog][4].

Back to Python
---
[Python has been criticized for having painful package management][7]. At work, we currently use [setuptools][8] for installing packages from [Github][9], and it does a pretty decent job. [As I've written before][10] you can specify `dependency_links` in the `setup.py` file to pull tarballs from any source control system that will provide them. Like I said, this works pretty well.

Mypi
---
I've also recently set up a [mypi][11] private package index for our work, so we can start moving towards small, reusable python packages. I've also looked at [djangopypi][12] and [djangopypi2][13], the latter being a [bootstrap][14]-converted fork of the former. Both these projects seem to add a little more functionality around users management, and of course they're built on [Django][14], which means you get the nice Django admin at the same time. I haven't had time to do a full comparison, that will have to come later. For the time being, [mypi][11] seems to do the trick nicely.

Where setuptools falls apart
---
Turns out, using [pip][15], you can just [specify a custom index][16] in your `~/.pip/pip.conf` and then `pip install <packagename>` and you're good to go. That's fine for installing one-off modules, however, automating the entire depenedency installation process wasn't obvious at first. 

Setuptools fail
---
My scenario had 2 projects, **Project A** and **Project B**. **Project A** relies on custom packages in my [mypi][11] index, and is published to the package also. **Project B** has a single dependency on **Project A**. Using [setuptools][8] `python setup.py install` would find **Project A** in the private package index (via `dependency_links`), but none of *Project A*'s custom index dependencies were being found, despite having specified the `dependency_links` in that project.

Long story longer (and the answer)
---
The answer just turned out to be a little bit more understanding of the evolution of python package management, [specifically this little tidbit about pip][17]:

> Internally, pip uses the setuptools package, and the pkg_resources module, which are available from the project, Setuptools.

Turns out [pip][15] spits out the setuptools configuration (whatever you have in your `setup.py`) into a `/<project-name>.egg-info/` folder, *including* `dependency_links`. 


To get the [pip][15] equivalent of `python setup.py develop` just run:
 
    # -e means 'edit'
    $ pip install -e .

To get the same for `python setup.py install` run:

    $ pip install .

### Done and done.

Hope that helps someone else down the road. Now we have a nice private registry for our python packages, and an easy way to automate their installation.


**Note** It appears that [djangopypi][12] is actually maintained by Disqus, that may make it a good reason to use the project, as it will probably be maintained for a longer period. I will explore that option and write up a comparison later.

[1]: http://blog.nodejitsu.com/the-nodejs-philosophy
[2]: http://npmjs.org
[3]: http://modulecounts.com/
[4]: http://substack.net/how_I_write_modules
[5]: http://blog.nodejitsu.com/the-nodejs-philosophy
[6]: http://en.wikipedia.org/wiki/Single_responsibility_principle
[7]: http://www.simplistix.co.uk/presentations/python_package_management_08/python_package_management_08.pdf
[8]: https://pythonhosted.org/setuptools/index.html
[9]: http://github.com/
[10]: http://blog.aaronfay.ca/github-setuptools-awesomeness
[11]: http://exhuma.github.io/mypi/
[12]: https://github.com/disqus/djangopypi
[13]: https://djangopypi2.readthedocs.org/en/latest/
[14]: http://djangoproject.com/
[15]: http://www.pip-installer.org/en/latest/
[16]: http://exhuma.github.io/mypi/index-config.html#downloading-installing-packages-from-the-index
[17]: http://www.pip-installer.org/en/release-1.4/logic.html#setuptools-pkg-resources