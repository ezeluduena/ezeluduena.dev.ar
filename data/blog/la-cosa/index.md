---
title: 'La Cosa'
date: '2024-07-25'
description: 
---

## La Cosa

Como trabajo de laboratorio de la materia [Ingeniería del Software](https://www.famaf.unc.edu.ar/documents/4409/Ingenier%C3%ADa_del_Software_I_LCC.pdf), se nos pidió realizar una implementación web del juego de mesa "La Cosa".

El objetivo del trabajo era simular una experiencia de desarrollo de software en la industria. Con este fin, utilizamos Jira como sistema de tickets y, durante 3 sprints de 15 días cada uno, aplicamos la metodología scrum en un grupo de 7 personas.

## El juego

"La Cosa" o "Stay Away! en inglés, es un juego de cartas de [deducción social](https://es.wikipedia.org/wiki/Juego_de_deducci%C3%B3n_social) basado en la película "The Thing" y en las historias de Lovecraft. El juego la verdad que tiene una dinámica media rara, si les interesa les dejo sus [reglas](https://drive.google.com/file/d/1s4IeDpYbX20jbroazP-CqOoIsnFvUnlZ/view?usp=sharing) y el [videíto](https://www.youtube.com/watch?v=MTqKINXKybI) de publicación que le hicieron que está muy piola.

## Desarrollo

Mi participación durante todo el proyecto fue de desarrollador backend y durante el último sprint también de scrum master.

Con respecto al backend, creamos un server con FastAPI que gestiona las siguientes funcionalidades:

- Jugadores conectados.
- Salas de espera para la creación de partidas.
- Partidas en curso.
- Chat en la sala de espera y dentro del juego, utilizando WebSockets.
- Dinámica y estado de cada partida, también utilizando WebSockets.
- Las cartas de cada partida y sus efectos al aplicarlas.

Para gestionar los datos de la aplicación utilizamos PonyORM a partir de un diagrama de clases creado y discutido previamente en la etapa de diseño.

Con respecto al testing, utilizamos Pytest para realizar tests de unidad y de integración con la base de datos. Integramos estos test a nuestro flujo de trabajo creando una Github Action en el repositorio para que se ejecutaran automaticamente en cada commit.

## Desafios

Este proyecto significó mi primer acercamiento al desarrollo de una app web, poniendo en práctica conceptos como la comunicación entre el frontend y el backend, testing, múltiples conexiones, asincronía, diseño y arquitectura de software, entre muchos otros.

Ante mi completa inexperiencia previa y la presión de cada entrega pasé bastante tiempo leyendo las documentaciones de las tecnologías mencionadas. También descubrí que fue fundamental para lograr los objetivos una comunicación asertiva con el grupo, siendo que en en los momentos de mayor dificultad fue el enfoque colectivo lo que nos ayudó a avanzar (perdón por el cierre cursi pero basado).

## Links y demo

**[Repositorio de github del backend](https://github.com/TukiLaCosa/backend)**

**[Documentación generada por FastAPI](https://backend-tuki.onrender.com/docs#/)** (Tarda en cargar la primera vez)

Una vez cargado el backend entrando al link anterior, se puede probrar la app con el **[frontend del juego](https://tuki-frontend-nine.vercel.app/)**.
