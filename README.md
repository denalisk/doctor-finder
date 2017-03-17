# "Who You Gonna Call" An exercise in javascript and API calls

#### _Who You Gonna Call_, 03.17.2017

### By _Sam Kirsch_

## Description

#### A website built as an exercise in API calls using jQuery. It allows users to search for doctors by city, based on a specified ailment. It loads a maximum of 10 doctors per search, but users can load more by scrolling to the bottom and clicking a button. The site displays information including the doctors' specialties, their practices, and contact information.

## Specifications

* Take user input for a general medical concern and a location and store it
* Make an API call to google maps to geocode the location
* Make an API call to BetterDoctors to get a list of relevant doctors
* Return a list of doctor objects to the user's view
* Allow the user to load more doctors on demand

#### Stretch Goals

* Allow a user to click on a doctor and find more information
* Add a map with markers for the doctors' locations
* place marker on doctor, with div label

## Setup

* Clone this repository
* create a file called .env and paste in:
* >exports.apiKey = "**YOUR API KEY**"
* >where **YOUR API KEY** is your personal apiKey for BetterDoctor.com
* run npm install and bower install
* run gulp serve and navigate to http://localhost:3000/

### Technologies Used

* HTML and SCSS
* Javascript with jQuery to make API calls, using npm, gulp, and bower to manage packages

[github link for this project](https://github.com/denalisk/doctor-finder)

##### Copyright (c) 2017 Sam Kirsch.

##### Licensed under the MIT license.
