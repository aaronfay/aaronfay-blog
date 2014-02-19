title: pip wheel, pip_accel, and curdling, a review
tags:
---

Lately at work I've been focused a lot on build automation and continuous deployment. We've progressed from Jenkins to Bamboo over time but that's a topic for another blog post. One of the issues that has come up the more we deploy things is *build time*. We're adopting a [DevOps][1] model at work, where one of the key principles is "tightening feedback loops".

Tightening feedback loops
-------------------------
The whole idea around this is that you want immediate feedback about a particular feature that you're working on so you know whether or not to course-correct. A primary example of this is [unit testing][2]. If you run your tests diligently after every single code change, and you keep your tests up-to-date, then you know immediately when something is wrong in the suite. In some cases however, your entire suite might be too large to run, or there may be many stages testing things at different levels, so you can't run the entire suite locally. Your build server steps in here and provides a mechanism to give you feedback in an async manner so you can continue to be productive.

The porty-thing loop
--------------------
We have these things at work called "porty-things". It's the techincal term for a deployment project's feature-branch deployed on an accessible port on the staging server. We found it helpful to have QA functionally test a feature before we did the code review so we didn't keep reopening branches when functional testing failed. In order for the project feature to be available to QA, we have the build server set up a deployed version of the feature branch on a port just for that purpose. So, we deploy *a lot*.

Back to build time
------------------
With this last example in mind, a 10-minute build is just way too bloody long for me to provide another person with the URL to check if my feature is cool. That's just enough time for me to get distracted on some other thing and then 20 minutes later come back to find out my build failed because a dependency went stale or test failed. One thing is totally key here:

> Builds need to be super-fast.

So I had to start analyizing what was slowing down the build process (although it didn't take much guessing). In one instance, we are using the awesome [django-cms][3] for websites and were building some custom CMS plugins. [django-cms][3] and (even [django][4]) has *a lot* of dependencies, both system-level and application-level. Even using a single system with the system dependencies installed, setting up a fresh virtualenv for each "porty-thing" was looking like a 7-10 minute build, guaranteed.

So, something has to change.

Wheel, to the rescue?
=====================

 - TODO: show the wheel setup, what's required to automate
 - time it
 - where did it fall short

pip_accel, you're up next
=========================
 
 - same as above

curdling
========

 - same as above





