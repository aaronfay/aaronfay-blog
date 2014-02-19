title: Dependency sets for pip
date: 2013-10-05 12:00:00
categories: programming
tags:
 - python
 - packaging
 - pip
---

One of the things I enjoy about building projects with [nodejs](http://nodejs.org/)
is using [npm](http://npmjs.org), specifically the `devDependencies` part of 
`package.json`. This allows you to have one set of dependencies that are 
installed in production, but have extra dependencies installed for development,
such as test libraries, deploy tools, etc. To get the development dependencies
with `npm` you run:

``` bash
$ npm intall --dev
```

## how about pip
It turns out if you are using `pip` 1.2 or newer, you can now do the same thing
in your `setup.py` file for Python packages.

An example `setup.py` file:

``` python
#!/usr/bin/env python

from setuptools import setup
from myproject import __version__ 

required = [
    'gevent',
    'flask',
    ...
]

extras = {
    'develop': [
        'Fabric',
        'nose',
    ]
}

setup(
    name="my-project",
    version=__version__,
    description="My awsome project.",
    packages=[
        "my_project"
    ],
    include_package_data=True,
    zip_safe=False,
    scripts=[
        'runmyproject',
    ],
    install_requires=required,
    extras_require=extras,
)
```

To install this normally (in "edit" mode) you'd run:

``` bash
$ pip install -e .
```

To install the `develop` set of dependencies you can run:

``` bash
$ pip install -e .[develop]
```

As you can see, you can have multiple sets of extra dependencies and call them
whatever you want.

Have fun,  
Aaron

