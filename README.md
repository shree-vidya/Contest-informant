# Contest Informant

> A website which holds information about all the competitions related to domains like coding, art and literature, dance and music, games in various colleges. 

## Purpose

> Advertising about a college event in colleges in different places is difficult. Hence the event organisers can post their event details in their website and update its details accordingly. It makes advertising about the competition easy for event organisers. Students can find details about competitions going on in various college in one place.

## Description

* Home page helps user to navigate to the specific domain of intrest.
* User can view the list of competitions without logging in.
* One must be logged in to post an event.
* User can only edit the event posted by him.

### Features

* Website [URL](http://agile-ocean-22562.herokuapp.com/)

* System architecture – **MVC architecture**

* Hosted on – **Heroku**

* Frontend languages - **HTML, CSS, JavaScript**

* Backend server environment – **Node.js**

* Backend Framework – **Express**

* Database - **MongoDB**

## SetUp

* Install Node.js

* Clone Git repository into desired location on your device.
```bash
git clone https://github.com/shree-vidya/Contest-informant.git
cd
```

* Install the required dependencies
```bash
npm init
npm install express express-session body-parser ejs connect-flash dotenv method-override mongoose passport passport-facebook passport-google-oauth20 passport-local passport-local-mongoose --save
```

* Run Node.js server
```bash
node app.js
```

* The website is available on 'http://localhost:3000' 








