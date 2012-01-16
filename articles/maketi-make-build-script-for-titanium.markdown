Title: MakeTi: The community make build script for titanium
Author: Matt Apperson
Date: Jan 15 2011

One of the things I never liked about Titanium Mobile was using Ti Studio... I don't use debugging, I don't like Eclipse, and for that matter, I was not a fan of Ti Desktop (it was better then studio, but still too clunky for my taste).

Before working at Appcelerator, all I wanted was good documentation on the CLI tools...

Well, as it turns out, the CLI tools Titanium has are kind of bloated in that they also enable things like analytics that I have zero interest in, and just slow down the build process.

![MakeTi](MakeTi-The-make-build-script-for-titanium/screenshot.png)

## The solution - MakeTi

I started this project as a way to have cleaner CLI commands (I should not need to declare my android path on every build for android). But after finding out that this also removed the chains of analytics, I could not help but press further!

## Features

	- Color highlighted console output for info/debug/warnings/errors makes it easier to read!
	- Build without Appcelerators analytics
	- Faster build times then Ti Studio, titanium.py (Appcelerators CLI tool), or even Ti Developer
	- Easy to use, just drag and drop the files, and run your project
	- Supports all released SDKs
	- It's Open Source!

## The choices made...

On day 0 of this project, I was going to use a py script like the existing Ti CLI, but then quickly switched, the reason was I wanted the tool to be pushed up with each project I personally make, so if I am working with a team, and need to make some alterations for that one project, all my team mates get the change too... it was just better for my work flow. When making that switch, I found the work from [Guilherme Chapiewski](http://guilherme.it) to do roughly the same thing. His work was rather basic as it just worked with iphone/ipad and no android or mobile web support, also the lack of command arguments was not as elegant as I would have liked. Too, his script required hard coding all paths into the make script (not good for my goal of sharing the script with a team).

So after patching up the things I did not like, and doing some code cleanup, I can now present to you MakeTi!

## Where things stand / Where it's going

Currently MakeTi is a v1 release... I have MANY new features I am working on, and will be adding soon.

Some upcoming features are:
- An integrated server, using nodejs so that the web SDK is more seamless to use.
- No need to compile as much! We will stream files to the simulator/emulator (again with a nodejs server) for faster development.
- Support for Linux/Windows
- Cleaning up the console output from titanium, only showing what we need to see, the rest throw in a log file

I welcome all feedback, as well as pull requests :)
If you find a bug, please report it in the issues tab on the github page.

## Getting started

To get started, just download the contents of the GitHub repo [here](https://github.com/mattapperson/MakeTi) and drop the files right into your Ti projects root directory.

The readme file in the repo contains all needed instruction on using MakeTi

I hope you enjoy MakeTi! Codestrong!