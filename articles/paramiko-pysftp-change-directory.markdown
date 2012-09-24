Title: Paramiko, PySFTP, and 'cd' problem
Author: Aaron Fay
Tags: Python, paramiko, ssh, sftp, PySFTP
Date: Sep 24 2012

At my [current position][] I'm getting the opportunity to do a lot of testing with 
[selenium][] (which I'll talk about later) and [vagrant][].  One of the things that 
I need to accomplish during testing is dynamically starting the development environment
in "TEST MODE" to perform functional testing against the webapp backend.

[current position]: http://www.strathcom.ca/
[selenium]: http://seleniumhq.org/
[vagrant]: http://vagrantup.com/

## Remote execute
I was `ssh`-ing into the server ok using [this ssh script][] (based on [paramiko]), 
something like:

    >>> client = ssh.Connection('localhost', username='vagrant', password='vagrant', port=2222)
    >>> client.execute('pwd')
    ['/home/vagrant\n']
    
The issue that I was having is _changing directories_.  A simple `cd ..` didn't seem
to want to do the trick:

    >>> client.execute('cd ..')
    []
    >>> client.execute('pwd')
    ['/home/vagrant\n']

I started thinking it's a permission issue or something, but, no, the `vagrant` user
should be root, nothing seemed to make the simple command execution work, at least, 
I can't think of another way to change directory on a linux box.  And to make things
more intersting, it didn't seem to matter if I used [PySFTP][] or the aforementioned 
[ssh.py][], the result was the same.

## Turns out to be simple
I'm not exactly sure why, but [this post][] on [teh Stack][] led me to the solution, 
turns out it was simple:

    >>> client.execute('cd ..; pwd')
    ['/home\n']
    
Just needed to execute the commands together.  Why? Your guess is as good as mine...

Af

[this ssh script]: http://zeth.net/post/332/
[ssh.py]: http://zeth.net/post/332/
[PySFTP]: http://code.google.com/p/pysftp/
[this post]: http://stackoverflow.com/questions/8932862/how-do-i-change-directories-using-paramiko
[teh Stack]: http://stackoverflow.com/
