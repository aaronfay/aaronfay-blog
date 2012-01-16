Title: Get a bottom tabbar on android in Titanium
Author: Matt Apperson
Date: Jan 16 2011

Sometimes when building apps you try and stick to the default UI LAYOUT as much as you can... but for some apps you want it's own look. For some, having "it's own look" means a tabbar on the bottom of the UI of the app.

Now I dont always recommend this, but for some apps I can see how it would make sense for the UX of the app.

So haw do we do this in Titanium Mobile?

## First thing to remember

The first thing you want to remember is 90% of whatever you want to be changed using any native config, can be done in Ti by placing that file in the projects root, under whatever structer it was to have in native land. So if the file in a native app would be in '/foo/text.xml', in Ti you would place it in '%your apps project root%/foo/text.xml'
Knowing that will help you with a lot of more advanced topics in Titanium dev.

## On to the good stuff

Place the following xml into a file named 'titanium_tabgroup.xml' (without the quotes), inside a new directory you will create called '%your apps project root%/platform/android/res/layout/'.

The XML you want to add [is found in this gist](https://gist.github.com/1621570)

Then do a clean build of your app and run in android :)

The result will look like this:
![bottom tabbar in titanium](bottom-tabbar/tabbar.png)

It is just that simple! And no hacking of a fake tabbar to do it :)