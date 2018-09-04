# bamazon

A command line interface application using nodeJS, LIRI: LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Installing
### Logging In to SQL Server
- download MYSQL Workbench (https://dev.mysql.com/downloads/workbench/) and the MySQL Community Server (https://dev.mysql.com/downloads/mysql/)
- Set up host, user and password by clicking on the "+" icon:
<img src="https://github.com/singha53/bamazon/blob/master/media/mysqlConnections.png">

```shell
$ git clone https://github.com/singha53/bamazon.git
$ cd bamazon/
```

## Walkthroughs

1) Return my recent 20 tweets (from @asingh_22g)

```shell
$ node liri.js my-tweets
-----------------------
Fri Jun 22 00:09:43 +0000 2018: RT @DavidFajgenbaum: Excited to see our new @SomaLogic proteomic study on #CastlemanDisease and #TAFRO syndrome published in AJH, revealing…
-----------------------
.
.
.
-----------------------
Wed Nov 22 12:39:42 +0000 2017: @jeremyhirota Lol yes it is. 😀 Congrats on your new CRC @jeremyhirota
-----------------------
```
2a) Search for a song from Spotify (returns artist(s), song's name, song url and albumn)

```shell
$ node liri.js spotify-this-song one dance
----------------------
Artists(s):
Drake,WizKid,Kyla
----------------------
Song's name:
One Dance
----------------------
Preview link:
null
----------------------
Album:
Views
----------------------
```
2b) default behaviour if no song is inputted

```shell
$ node liri.js spotify-this-song
----------------------
Artists(s):
Ace of Base
----------------------
Song's name:
The Sign
----------------------
Preview link:
https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=06eef2ced23844c39eabaa503f3e14d8
----------------------
Album:
The Sign (US Album) [Remastered]
----------------------
```
3a) Search for a movie from OMDB API (returns title, year, IMDB rating, Rotten Tomatoes rating, country of release, language, plot and actors)

```shell
$ node liri.js movie-this Training day
----------------------
Title:
Training Day
----------------------
Year of release:
2001
----------------------
IMDB Rating:
7.7
----------------------
Rotten Tomatoes Rating:
72%
----------------------
Country:
USA, Australia
----------------------
Language:
English, Russian, Spanish, Korean
----------------------
Plot:
On his first day on the job as a Los Angeles narcotics officer, a rookie cop goes beyond a full work day in training within the narcotics division of the LAPD with a rogue detective who isn't what he appears to be.
----------------------
Actors:
Denzel Washington, Ethan Hawke, Scott Glenn, Tom Berenger
----------------------
```

3b) default behaviour if no movie is inputted

```shell
$ node liri.js movie-this
----------------------
Title:
Mr. Nobody
----------------------
Year of release:
2013
----------------------
IMDB Rating:
7.9
----------------------
Rotten Tomatoes Rating:
66%
----------------------
Country:
Belgium, Germany, Canada, France, USA, UK
----------------------
Language:
English, Mohawk
----------------------
Plot:
A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
----------------------
Actors:
Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham
----------------------
```

4) run command from file (spotify-this-song,"I Want it That Way")

```shell
$ node liri.js do-what-it-says
----------------------
Artists(s):
Backstreet Boys
----------------------
Song's name:
I Want It That Way
----------------------
Preview link:
https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=06eef2ced23844c39eabaa503f3e14d8
----------------------
Album:
The Hits--Chapter One
----------------------
```

## Programming Languages

- JavaScript (nodeJS) 
- npm packages (dotenv, node-spotify-api, twitter, request, fs)

## Features

- search for tweets, songs and movies

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links

- Repository: https://github.com/singha53/https://github.com/singha53/node-liri-app/

## Licensing

The code in this project is licensed under MIT license.
