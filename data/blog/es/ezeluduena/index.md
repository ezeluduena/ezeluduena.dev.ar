---
title: 'Creando una página web personal'
date: '2024-10-13'
description: 'En este blog comento como cree mi portfolio y blog personal a partir de una página web open source. Menciono las características buscadas, cómo fueron adaptadas, y cómo agregué las faltantes.'
comment_section_title: 'Creating a Personal Website' 
---

Cuando uno comienza a buscar empleo en programación o tecnología, se enfrenta a un gran problema para ser contratado: la falta de experiencia laboral.

Al no tener ningún empleo como antecedente para validar las habilidades que uno asegura tener, se necesitan otros métodos para destacar y convencer que es buena idea contratarnos. Uno de estos métodos, el que aparece en todos lados en Internet, es el de contar con un portfolio web.

Con este objetivo en mente, y con las ganas de tener una página web propia, desarrollada y mantenida por mí mismo, fue que decidí iniciar este proyecto.

## Características

Justo cuando andaba con esta idea en la cabeza me encontré con este [video](https://youtu.be/nIracKeqsFk?si=2Q0Ut6z6aCuUITEA), que me pareció muy bueno y me sirvió para definir las siguientes funcionalidades para mi página web:

- Presentación personal.
- Links a redes sociales y formas de contacto.
- Mostrar los proyectos realizados, explicando cómo fueron desarrollados.
- Incluir una sección de blog.
- Posibilidad de agregar distintos idiomas.

## Tyrrrz.me

Buscando fuentes de inspiración en la lista de páginas open-source [developer-portfolios](https://github.com/emmabostian/developer-portfolios), encontré la página [tyrrrz.me](https://tyrrrz.me/) que, con una estética simple que me gustó, cumplía con casi todas las características principales que estaba buscando, además de sumar otras interesantes.

En ese momento pensé: ¿para qué reinventar la rueda y enfrentar la curva de aprendizaje de desarrollo frontend con una página que afectará directamente a mis oportunidades laborales?

Entonces decidí forkear el repositorio, adaptarlo a mis necesidades y agregarle la posibilidad de cambiar el idioma de la página, que era la única funcionalidad faltante.

## Implementación

Esta página utiliza las siguientes tecnologías:

- Next.js
- React
- Typescript
- TailwindCSS
- Node.js

Después de varias horas leyendo el código, consultando las documentaciones, googleando y probando la página, logré comprender las diferentes características y su funcionamiento. Esto me permitió identificar los cambios necesarios para adaptar y personalizar el sitio según mis necesidades.

### Botón de selección de idioma

Con el fin de aumentar el alcance y las posibilidades que puede generar la página, me pareció fundamental que el contenido del sitio esté disponible en inglés, además de en español. La opción por excelencia para este tipo de tareas es utilizar el framework [i18next](https://www.i18next.com/), pero su implementación sólo es sencilla en sitios web dinámicos y, como explicaré más adelante en la sección [Deploy y dominio](/blog/es/ezeluduena#deploy-y-dominio), yo necesitaba que mi página fuera estática.

Para atravesar esta dificultad, decidí replicar el mecanismo del framework utilizando un diccionario para guardar los textos de cada sección en español y otro para realizar lo mismo en inglés.
Luego, los distintos componentes de la página consultan esos diccionarios para cargar el texto adecuado según el idioma.

Para seleccionar el diccionario correcto utilicé un hook de `React` que reconoce el idioma preferido del navegador, pero también permite cambiarlo manualmente y guardar el seleccionado.

Con respecto a los blogs, opté por tener dos archivos separados con el contenido completo en cada idioma, accesibles mediante rutas distintas y utilizando el hook para redirigir automáticamente al correcto según el idioma seleccionado.

El cambio de idioma se activa a través de un botón que se encuentra en la parte superior de la página, a la derecha del botón de selección de modo oscuro/claro. El ícono lo obtuve de [The Noun Project](https://thenounproject.com/) y utilicé Inkscape para añadirle las etiquetas "En" y "Es".

Aunque esta implementación no ofrece la escalabilidad de `I18next` para agregar o quitar idiomas, fue relativamente sencilla de implementar y es suficiente para mis necesidades actuales.

## Deploy y dominio

Dado que el proyecto original estaba deployado con [Vercel](https://vercel.com/), y este servicio tiene alta compatibilidad con Next.js y Node.js, fue sencillo cargarlo a mi cuenta, integrarlo con el repositorio y automatizar el proceso para que, tras cada commit en la rama `master`, los cambios impacten rápidamente en la página.

### Dominio .dev.ar

Hablando con un amigo sobre esta idea, me comentó que estaban disponibles gratuitamente dominios `.dev.ar`. No tenía bien claro qué dominio era el mejor para la página y esta opción permite mostrar un link más llamativo, que no incluye el nombre de ningún servicio de hosting.

[Acá les dejo el link](https://home.dev.ar/) donde se puede solicitar el dominio gratuitamente. Sólo te piden que ingreses un mail, que prometen que no se lo van a vender a nadie.
En la página comentan que no les significa mucho esfuerzo mantener el proyecto y que lo hacen para aportar al desarrollo de otros programadores argentinos. También les dejo el [link](https://github.com/pragmore/dev.ar) al repositorio de la app que utilizan para manejar los subdominios.

El único inconveniente que encontré fue que no se ofrece la verificación a través de un registro `TXT`, que es necesaria para configurar un dominio personalizado en Vercel y en otros proveedores. Los registros `TXT` se utilizan, entre otras cosas, para  verificar la propiedad de un dominio en los sistemas DNS.
Al no disponer de esta opción, si deseaba utilizar este dominio, debía cambiar la forma de hostear la página. Dado que está explicado cómo utilizar el dominio con `GitHub Pages`, decidí mover la página a ese servicio.

### Github Pages

Github ofrece un servicio de hosting gratuito, directamente desde el repositorio, para sitios web estáticos. Es sencillo de configurar y, cómo mencioné antes, los dominios .dev.ar tienen soporte para ser utilizados en este servicio.

El mayor desafío fue modificar la lógica de la página para que pudiera compilarse y funcionar estáticamente. Afortunadamente, siguiendo [este tutorial](https://www.youtube.com/watch?v=mJuz45RXeXY) sobre cómo deployar una aplicación de Next.js en GitHub Pages, resultó ser un proceso relativamente sencillo.

Para manejar el deploy automático y la actualización de dependencias, utilicé `GitHub Actions` y `Dependabot`. [Acá](https://github.com/ezeluduena/ezeluduena.dev.ar/tree/master/.github) pueden ver los respectivos archivos de configuración.

### Vercel

A pesar de cambiar el servicio de hosting principal, mantuve Vercel para aprovechar los deploys automáticos a cada rama del repositorio. Esto fue muy útil para, automáticamente, ver los cambios que iba agregando mientras mantenía una rama de producción y otra de desarrollo, donde implementaba el cambio de idioma. Además, este servicio aporta comentarios y pruebas de deploy automáticas a cada pull request creada.

## Resumen de funcionalidades

Este fue mi camino desarrollando la página donde estan leyendo esto, les dejo un resumen de sus características en caso de que quieran utilizarla y adaptarla a sus necesidades:

- Home page con presentación personal y foto.
- Página de proyectos.
  - Breve descripción de cada uno.
  - Tecnologías utilizadas.
- Blog.
  - Feed RSS.
  - Calculadora de tiempo de lectura.
  - Comentarios y reacciones con la cuenta de GitHub, utilizando [Giscus](https://giscus.app/es).
- Links de redes sociales al final de cada página.
- Modo claro y oscuro.
- Soporte para dos idiomas (inglés y español).

Si llegaron hasta acá, les invito a que comenten que cambiarian o le agregarían a la página. Cualquier feedback es agradecido.

Acá les dejo el [link al repositorio](https://github.com/ezeluduena/ezeluduena.dev.ar). Muchas gracias por leer 😊.
