Title: Changing servers, and setting up PHP and NodeJS on a single box
Author: Matt Apperson
Date: Dec 15 2010

So now that we have discussed my new blog... That seemed like a logical place to start as I had this shiny new blog, and a ton of new readers. However for the sake of those of you following along to set up your own environment, let's jump back to the start of things... setting up the server. 

## What I had
Before running down this rabbit hole of building a tone of new tools (or setting them up at the very least), I was running a rather junky old VPS (but at $6 a month who could complain?) but with only 128mb of ram, running the last major version of CentOS(v5.x) I needed an upgrade... after all, even YUM needed me to disable fastestmirror anytime I would use YUM or I would run out of memory... clearly I needed more as I was no longer just displaying flat HTML and a few hacked PHP scripts.

## Selecting a server / host
My first thought going into this was to not use PHP at all ( I will get into that more later ), so initially I was only looking at node.js hosts such as Nodester, and Nodejitsu... and after doing some research on them, I was rather impressed with Nodejitsu. I waited for my beta invite to come, and was looking forward to getting started soon... but then I realised... node.js is not ALL I wanted! Yes as exciting as it was going to be to have all node.js server side code, it simply was not practical... I did not want to reinvent the wheel with everything I went to use.
Going back to the drawing board, I decided to head to the ever reliable [webhostingtalk.com](webhostingtalk.com)! In the past I had checked out the site many times for review on web hosts, and knew I could get some good reviews. So after a lot of digging through reviews I found [AlienLayer](http://alienvps.com/vps-hosting-specials/)... they had a rather nice holiday sale going on that was better then any of the VPS hosts with data centers on the East Coast of the USA. 1GB of dedicated RAM, and extra 1GB of Vswap, 1TB of data transfer, CentOS 6, on an OpenVZ platform... I simply could not find a better deal... 

So 5min after registering, I had the login details in my inbox!

## Setting up
Now to the fun parts! I got to setup my shiny new server :) After the useal setting up of security, nothing fancy, I took to installing Node.JS... this was a mess I have to say... the instructions for a package setup were just flat out wrong, but that asside I got the job done... the method I used is as follows:

- cd /usr/local/
- git clone --depth 1 https://github.com/joyent/node.git
- cd node
- ./configure --prefix=/usr/local/node
- make
- make install
- echo 'export PATH=$PATH:/usr/local/node/bin' >> ~/.profile
- source ~/.profile

YAY! NodeJS was installed... now onto NPM... this one I cheated on a little...

- yum install npm

Because we want our node scripts to run, even when we are not logged in, I installed the forever module... this as the name implies, keeps a script running forever.

- npm install forever -g

Now to get the tool I now love more then any other... NVM, this tool will deal with any and all upgrades and downgrades of NodeJS and already saved me a ton of time... the instructions for this are found in the [github repo for nvm.](https://github.com/creationix/nvm) Get that, and run 

- nvm install v0.6.5
- nvm use v0.6.5
- vm alias default v0.6.5

These commands will install the latest stable release, and make that the default version... later you can easely use it to upgrade.

## What about Apache / PHP?
I wont go through the boring installing Apache and PHP setup... do that however you want... personally I cheated and used yum.

The interesting part comes into play now...
You see Apache by default listens on port 80... if you let it, it will hijack all your browser based traffic from node... clearly that was not going to work... so whats a guy to do?

First, lets change the port Apache listens on... I moved mine to port 8080

- open '/etc/httpd/conf/httpd.conf' in your editor of choice
- Find this line that says 'Listen 80' without the quotes
- Replace with the following line 'Listen 8080'
- Save the edited file
- Restart httpd

Ok, now port 80 is free for NodeJS to use... so lets get it working...

## Sharing the connection
Because NodeJS has a built in http server, each node script you run that will have a http based interface, will all clamor for the same port 80, not ideal. 
Thankfully, some smart person out there developed a node module to help us out called http-proxy... this module will let us navigate all incoming http requests and point it in the right direction (apache or node script).
Setting it up is easy, I placed mine in /var/www/html/route/ like so:

- mkdir /var/www/html/route
- cd /var/www/html/route
- npm install http-proxy
- Upload my route handling file: 

<setting-up-nodejs-and-apache/server.js>

You can alter those settings as needed for you sites...

Then simply run:

- forever start /var/www/html/route/server.js

  And that's it! Your all set with a server running both node.js, and Apache/PHP!