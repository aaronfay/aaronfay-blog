title: Converting a SQLite3 database to MySQL
date: 2014-02-21 22:45:00
categories:
 - programming
tags: 
 - database
 - automation
 - mysql
 - sqlite
---
I have need to migrate some sqlite3 databases to mysql for a couple django-cms projects at work. Typically in the past
I've used [fixtures][1] in Django to get this done, but I usually have to align the planets and concoct the elixir of
life to get the fixtures to migrate properly. It usually has to do with foreign key errors something. This is something
that should just be easy, but in my experience with Django, it never is.

[Theres's a couple posts][2] on [stackoverflow with various scripts][3] to convert content from sqlite to mysql, but none of
them lined up the planets just right.

[Then I happened on this page][4] where there's a [python script][5] by [this guy][6] that is not based on the others. **And it just worked**.
The script looks like:

[1]: https://docs.djangoproject.com/en/dev/howto/initial-data/
[2]: http://stackoverflow.com/questions/18671/quick-easy-way-to-migrate-sqlite3-to-mysql
[3]: http://stackoverflow.com/questions/1067060/translating-perl-to-python
[4]: http://www.redmine.org/boards/2/topics/12793?r=24999
[5]: http://www.redmine.org/attachments/download/6235/sqlite3-to-mysql.py
[6]: http://www.redmine.org/users/27112

``` python convert.py
#! /usr/bin/env python

import sys

def main():
    print "SET sql_mode='NO_BACKSLASH_ESCAPES';"
    for line in sys.stdin:
        processLine(line)

def processLine(line):
    if (
        line.startswith("PRAGMA") or 
        line.startswith("BEGIN TRANSACTION;") or
        line.startswith("COMMIT;") or
        line.startswith("DELETE FROM sqlite_sequence;") or
        line.startswith("INSERT INTO \"sqlite_sequence\"")
       ):
        return
    line = line.replace("AUTOINCREMENT", "AUTO_INCREMENT")
    line = line.replace("DEFAULT 't'", "DEFAULT '1'")
    line = line.replace("DEFAULT 'f'", "DEFAULT '0'")
    line = line.replace(",'t'", ",'1'")
    line = line.replace(",'f'", ",'0'")
    in_string = False
    newLine = ''
    for c in line:
        if not in_string:
            if c == "'":
                in_string = True
            elif c == '"':
                newLine = newLine + '`'
                continue
        elif c == "'":
            in_string = False
        newLine = newLine + c
    print newLine

if __name__ == "__main__":
    main()

```

### Usage
``` bash
$ sqlite3 mydb.sqlite .dump | python convert.py > out.sql
```

Thank you [Behrang Noroozinia][6] from internet land, you solved a long-standing problem of mine.
