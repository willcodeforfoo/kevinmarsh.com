---
date: "2021-03-04"
title: "20 Years Ago: SongMeanings"
slug: 20-years-ago-songmeanings
---

_20 years_ ago today I posted a [message](http://forums.winamp.com/showthread.php?threadid=43674) on the Winamp Forums[^1] announcing to the world a project I started during Christmas vacation and had been working on for a few months:

![Screenshot from Winamp Forums announcing SongMeanings](https://icdn.remarkedusercontent.com/s/sh:0.5/rs:fit:1200/aHR0cHM6Ly9jZG4ucmVtYXJrZWR1c2VyY29udGVudC5jb20vZmlsZS9yZW1hcmtlZC1wcm9kLzEvbWFya3MvODZzTWlMblkvMjAyMTAxMTgtMTAyNTQ3LnBuZw.jpg)

The reaction was amazing and the next few months were some of thrilling of my life. Some of the very same ups and downs of traffic, user growth, and server issues that dot-com era startups with millions in funding were dealing with were playing out in my bedroom, in-between classes my Senior year of high school, on AIM, and on various budget shared web hosts. I never told anyone in the real world about SongMeanings. My parents didn't know, my school friends didn't know. It was just my own online thing, part of my virtual persona. It even sounded weird to say it out loud because I had uttered it so few times.

I let SongMeanings slip out of my hands when I start college and it was moved forward from a scappy (illegal) site to a legit business. But money was never part of the equation with me and SongMeanings. I didn't have any to put in and never got anything out. But that never mattered.

But looking back I learned more about my current professional software life building SongMeanings than any book, class, or degree ever could have taught me. It was all about wanting to _build_ something, reading how others did it, copying and hacking away until it (mostly) worked, sharing it with the world hours later, and doing it all over again.

## Up And Running 2 Decades Later

I found an old CD-R I had burned of the code and a database backup from October 2001 and wondered if I could get it running today. To my surprise, it took about 30 minutes to get the entire site up and running again in a Docker container, looking exactly like it did 20 years ago. Like a mosquito trapped in amber. PHP4 and MySQL 3.23 installed in fractions of a second in a [`debian/eol:potato` Docker image](https://hub.docker.com/r/debian/eol/) on a modern 32-core machine.[^2]

![](https://icdn.remarkedusercontent.com/s/q:90/sh:0.5/rs:fit:1200/aHR0cHM6Ly9jZG4ucmVtYXJrZWR1c2VyY29udGVudC5jb20vZmlsZS9yZW1hcmtlZC1wcm9kLzEvbWFya3MvYVlzWWk5TW0vMjAyMTAxMTgtMTA0NjQzLnBuZw.jpg)

Practically everything works: viewing artists, commenting on lyrics, even logging in. I typed in my old username and password and was instantly shown a summary of what had happened since the last time I logged in. 3 new Private Messages greeted me like an old friend. I viewed the very first lyric I posted to SongMeanings, Evaporated by Ben Folds Five:

![](https://icdn.remarkedusercontent.com/s/q:90/sh:0.5/rs:fit:1200/aHR0cHM6Ly9jZG4ucmVtYXJrZWR1c2VyY29udGVudC5jb20vZmlsZS9yZW1hcmtlZC1wcm9kLzEvbWFya3MvbGJzMGk0RFcvMjAyMTAxMTgtMTEyOTA3LnBuZw.png)

That song still has the same ID on SongMeanings today, 1: https://songmeanings.com/songs/view/1/. So much has changed but the roots are still there, intact.

The latest blog post was me trying to sound like I had any idea about what had happened just _2 days after_ September 11, 2001[^3]:

![](https://icdn.remarkedusercontent.com/s/q:90/sh:0.5/rs:fit:1200/aHR0cHM6Ly9jZG4ucmVtYXJrZWR1c2VyY29udGVudC5jb20vZmlsZS9yZW1hcmtlZC1wcm9kLzEvbWFya3MvRWJzd2k3R1kvMjAyMTAxMTgtMTExMjA0LnBuZw.jpg)

The original code is a comical jumbled mess (As most PHP probably was in that day!) SQL queries interspersed with HTML (mostly without CSS) riddled with XSS and SQL-injection vulnerabilities. Here's a piece of PHP typical in SongMeanings 1 from probably the most run file, `showsong.php` (yep, every URL was a file... no RESTful routes back then!)

```php
<?  // showsong based on $id
GLOBAL $admin;
require_once("shared.inc");

db_connect();
//$qwer = mysql_query("UPDATE songs SET pageviews = pageviews + 1 WHERE id = \"$id\"");
//$ok = mysql_query($qwer);

session_start();
$qwer = mysql_query("INSERT INTO lyricviews (userid, lyric, date, ip) VALUES ('$user_identification', '$id', NOW(), '$REMOTE_ADDR')");
$ok = mysql_query($qwer);

$rs = mysql_query("SELECT lyrics.cover, lyrics.userid, date_format(dateadded, '%b %e, %Y') as submitdate, lyrics.artist_id as artistid, lyrics.title, lyrics.pageviews, lyrics.mbviews, lyrics.ratingcount as ratingcount, lyrics.rating as rating, lyrics.lyrics, lyrics.id, artists.name as artistname, users.username as username FROM songs lyrics, artists, users WHERE lyrics.id like \"$id\" and artists.id = lyrics.artist_id and users.id = lyrics.userid");
$exists = mysql_num_rows($rs);
```

There are probably a dozen things wrong just these 12 (out of just about 14K) lines of code. Not to mention it was all edited by hand, in real time, on the production site via FTP. No local development, no staging server, no source control, no tests, no QA: and it was amazing.

There's nothing tangible left from that era. I never saw anyone I worked with on SongMeanings in real life, nor any of the friends I spent so long chatting with late nights on AOL and AIM. Once I was disconnected, they were gone forever.

I sometimes wonder what could've been, what might've become of SongMeanings and myself had I stuck around. But it's a fleeting thought, what happened happened. I instead took everything I learned and built a foundation for a career 20 years running and left nothing but fond memories.

[^1]: Much to my surprise, this original link on the Winamp Forums *still works* even after Nullsoft had been acquired and Winamp sold a couple times since!
[^2]: Of course, back in those days running real PHP was just as easy because most web hosts had it pre-installed. All you had to do was FTP up your scripts and you were up and running (well, to a point.)
[^3]: Funny how I led with news about the site instead
