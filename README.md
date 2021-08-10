# BualaTok
_Taken from the draft of the project:_

(ESP): web de venta e intercambio de productos de segunda mano entre particulares donde cada usuario anuncia artículos en modo de venta o intercambio y otros usuarios lanzan ofertas de compra o cambio de dichos artículos

(EN): second hand item selling and trading website between particulars, where each user announces their articles as either selling or trading, and other users can make buying offers or item trades.

This repository hosts a web development project for a 4th year class of a Computer Science degree. It consists in a mockup website where users can sell or trade their items as explained before. Its a full stack project, which means it holds both the frontend, which is what the user will see when interacting with the platform, and the backend which is what a server would be running to offer this service. It has been developed using Handlebars and Bootstrap, with a little bit of vanilla JavaScript and some JQuery mixed in for the Frontend, while using NodeJS combined with Express for the Backend.

This project is a simple mockup. BualaTok as an entity does not exist, and if it were to exist its mere coincidence. Its a simple project to put into practice web development knowledge and different practices and frameworks. This is by no means a product that should be shipped or sold, as it lacks a lot of stuff, and should be taken as just something made to learn technologies.

## Table of contents


* Installation
* User guide
* TODO list
* Final notes

## Installation


This project was developed using **```NodeJS v14.16.1```** or higher, so make sure to have it installed in your machine.
It also makes use of a **`MySQL`** database to handle the persistence, so its a must to have one the machine.

To get the server up and running, follow the next steps
```bash
# Clone repository
$ git clone https://github.com/Emdien/bualatok

# Go into the repository
cd Bualatok

# Install all the dependencies
npm install

# Start the server on your machine
npm start
```

Important to note that the server uses by default port 3000, so if you are launching the server on your machine, the link to access it will be `localhost:3000`

## User guide

The website contains the following pages:
+ Login + Register initial page. Users need to authenticate to get to the main page
+ Main page. Shows a top navbar with different actions and a search bar. It's also displayed a set of categories to quickly find items listed on the website
+ Search items page. Offers a search with different filters and lets you buy them easily. Not paginated.
+ Register item page. Requires things such as giving it a name, description, price, picture and indicating its state (New, Good, Bad)
+ Your items. It shows a list of the items you have listed at the moment.
+ Options page. It lets you modify different aspects of your profile, such as your password.

## TODO List

I don't know if I'll go through any of these as this was just a class project, but still gotta keep them in mind.

+ Trade items page and interactions
+ Pagination on search results for better performance when listing a large amount of items
+ Small QOL changes

### Final notes


Si algún profesor de la asignatura tiene algún problema con este repositorio, mandar un email a gonzalo.nicolasm@um.es y lo cambiaré a privado.
