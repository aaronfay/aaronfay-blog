title: On code and change...
date: 2013-03-01 12:00:00
categories:
 - general programming
tags:
 - rant
 - testing
---

## Thoughts in general:

 * develop like the code is going to change, make sure it's changeable, test it, refactor it, fail early, experiment and request feedback
 * deploy like it's going to change, plan for scaling (even if you don't have to), modularize, and automate whenever possible
 * create infrastructure like it's going to change, adopt methods that let you pull out pieces and put in new ones.

Your setup is going to change, program like that's the only thing that will remain constant.

### On Testing

Testing is not about finding bugs. It's not even really about making sure a piece of code works, you could do that yourself. Testing is to make sure *you can change it later*.

### On projects
When you set up a project, if you have no built-in or prescribed way of specifying the dependencies of the project, you're going to find yourself pulling your hair out down the road. You **are** going to have to wipe it out and start from scratch at one point, or even if you don't, you still need to replicate the setup for stage, and production, and another developer. Save yourself some trouble, use the package management system or your language, or the one prescribed by the community.  [Setuptools][1] for Python, [npm][2] for node, [gem][3] for ruby. Manage your own packages with these. It will save you mondo time down the road. If your language doesn't have package management, bail, find a language that does.

### and a rant
If you're using Perl, use [cpan minus][4], cpan is a pain, [cpanm][4] removes some of the pain. If you're using php, well, god help you.

[1]: http://pythonhosted.org/an_example_pypi_project/setuptools.html
[2]: https://www.npmjs.org/
[3]: http://rubygems.org/
[4]: http://search.cpan.org/~miyagawa/App-cpanminus-1.7001/bin/cpanm
