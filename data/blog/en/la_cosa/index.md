---
title: '"La Cosa": A backend web game development'
date: '2024-07-25'
description: 'As part of the Software Engineering course, we created a web version of the card game "The Thing". Applying Scrum, we used FastAPI for the backend and PonyORM for data management. During the project, I worked as a backend developer and scrum master, facing various technical and collaboration challenges. We include links to the GitHub repository, the generated documentation, and a demo of the game.'
---

## The Thing

As a lab project for the [Software Engineering](https://www.famaf.unc.edu.ar/documents/4409/Ingenier%C3%ADa_del_Software_I_LCC.pdf) course, we were tasked with creating a web implementation of the card game "Stay Away!".

The goal of the project was to simulate a software development experience in the industry. To this end, we used Jira as a ticketing system, and during 3 sprints of 15 days each, we applied the Scrum methodology in a group of 7 people.

## The game

"Stay Away!", or "La Cosa" in Spanish, is a [social deduction game](https://en.wikipedia.org/wiki/Social_deduction_game) based on the movie "The Thing" and Lovecraftian stories. The truth is, the game has a somewhat odd dynamic. If you're interested, here are the [rules](https://drive.google.com/file/d/1OcZp60oKTge9ZDd1ImXcw81zQC9kxDLe/view?usp=sharing) and the [publication video](https://www.youtube.com/watch?v=MTqKINXKybI), which is quite cool.

## Development

My role throughout the project was as a backend developer and also as scrum master.

Regarding the backend, we created a server with FastAPI that manages the following functionalities:

- Connected players.
- Waiting rooms for game creation.
- Games in progress.
- Chat in the waiting room and within the game, using WebSockets.
- The dynamics and state of each game, also using WebSockets.
- The cards in each game and their effects when applied.

To manage the application data, we used PonyORM based on a class diagram created and discussed earlier in the design stage.

Regarding testing, we used Pytest for unit and integration tests with the database. We added these tests to our workflow by creating a GitHub Action in the repository so that they would run automatically on every commit.

## Challenges

This project was my first approach to web app development, putting into practice concepts such as frontend-backend communication, testing, multiple connections, asynchronous programming, software design, and architecture, among many others.

Given my complete lack of previous experience and the pressure of each deadline, I spent quite some time reading the documentation for the mentioned technologies. I also discovered that assertive communication within the group was essential to achieving our goals, as collective focus helped us move forward during the most challenging moments (sorry for the cheesy ending, but it's true).

## Links and demo

**[GitHub repository for the backend](https://github.com/TukiLaCosa/backend)**

**[Generated documentation by FastAPI](https://backend-tuki.onrender.com/docs#/)** (It takes a while to load the first time)

Once the backend is loaded, you can try the app with the **[game's frontend](https://tuki-frontend-nine.vercel.app/)**.
