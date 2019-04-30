# BYOB

## Overview:

WeatherMind is my take on the Apple IOS weather app. This weather app gets real time weather of your location. As well you can search locations all over the world for their current weather. When searching for weather you are able to see the forecast by the hour and the week. Also you can find more details about the current weather in your location. I built this app with the intent on converting this into a react native application.


## Preview:


Select Weather Location            |  Search Weather
:-------------------------:|:-------------------------:
<img src="src/media/PartOne.gif" alt="WeatherMind">  |  <img src="src/media/PartTwo.gif" alt="WeatherMind">

## Getting Started:

These instructions will get a copy of the project up and running on your local machine for usage and testing purposes.

### Frontend
clone down the repo: ```$ git clone https://github.com/MRKrog/WeatherMind```

cd into directory and run npm install: ```$ npm install```

Create a .env file and your google api key like below:

REACT_APP_GOOGLE_API_KEY=apiKeyHere

(make sure to add this .env file to your .gitignore)

Start up in your terminal: ```$ npm start ```

### Backend
clone down the repo: ```$ git clone https://github.com/MRKrog/WeatherMind-api```

create keys.js file at the same level as app.js - add the following
export const apiKey = apiKey
export const googleApi = 'apiKey

cd into directory and run npm install: ``` $ npm install ```

Start up in your terminal: ``` $ npm start ```

## Future Development and Extensions Notes:

- Built out functionality in React Native and used on mobile applications \
- Add weather history features STLY & STLW weather display information \
- Add Map feature to search locations through points on a map \
- Add ability save places and locations

### Technologies Used
WeatherMind was built using:
- [SCSS](https://sass-lang.com/)

And tested using:
- [Enzyme](https://airbnb.io/enzyme/) & [Jest](https://airbnb.io/enzyme/docs/guides/jest.html)

## Contributors
- [Michael Krog](https://github.com/MRKrog)

---
**[Back to top](https://github.com/MRKrog/WeatherMind/blob/master/README.md#WeatherMind)**
