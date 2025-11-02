---
title: 'Poniendo a trabajar a los números'
date: '2025-08-07'
description: 'Este trabajo analiza la relación del presupuesto ejecutado por el estado nacional argentino en políticas laborales y los indicadores sociales de desempleo,  subocupación e informalidad durante los períodos de gobierno 2011-2015 y (2015-2019). Se utilizó la base de datos de Presupuesto Abierto del Ministerio de Economía para filtrar los montos invertidos con la función de promover el trabajo. Para el cálculo de las tasas laborales se consideraron los resultados de la EPH del INDEC. Este artículo también describe detalladamente la metodología utilizada para el estudio de grandes bases de datos gubernamentales abiertas, la reproducción de indicadores sociales públicos, el proceso de deflactación de valores (necesario al comparar montos presupuestarios ejecutados en un contexto inflacionario) y la estimación de datos faltantes utilizando interpolación numérica.'
comment_section_title: 'Putting the numbers to work'
---

Motivados por las dificultades que enfrentamos en Argentina para conseguir trabajos de calidad, las crisis económicas y la permanente discusión de los últimos años acerca del rol del Estado en la sociedad, fue que nos propusimos indagar **¿en qué medida el presupuesto nacional en políticas de empleo incide en las estadísticas laborales?**.

Con este fin, seleccionamos para comparar **los períodos de gobierno 2011-2015 y 2015-2019, con Cristina Fernandez y Mauricio Macri** en la presidencia respectivamente. Estas administraciones nos resultaron interesantes ya que se dieron en un contexto global y social relativamente estable, evitando por ejemplo la pandemia por el COVID-19, y además representaron un marcado contraste en cuanto a las políticas laborales y económicas que llevaron a cabo.
A partir de esta selección, **analizamos la relación entre el presupuesto ejecutado con la función "Trabajo" y los indicadores de desempleo, informalidad y subocupación.**

Este trabajo fue desarrollado por **Ezequiel Ludueña (yo), Manuel Barragan, Micaela de Hernández y Marco Spalleti**, en el contexto de la [SocioHackathon](https://sociales.unc.edu.ar/content/todav-est-s-tiempo-de-presentarte-en-el-i-socio-hackathon-investigar-en-sociales-2024-la) realizada por la facultad de Ciencias Sociales de la UNC el año pasado. Con un equipo de miembros provenientes de las Ciencias de la Computación, Ciencia Política y Sociología, abordamos esta consigna de investigación utilizando grandes bases de datos y conseguimos el **[primer premio](https://sociales.unc.edu.ar/content/i-socio-hackathon-investigar-en-sociales-2024-ya-se-conocen-les-ganadores-del-concurso)**.

## Datos

- Para obtener la cantidad invertida en politicas laborales utilizamos la base de datos de **[Presupuesto Abierto](https://www.presupuestoabierto.gob.ar/sici/datos-abiertos)** del **Ministerio de Economía**, en particular el dataset **"Presupuesto de gastos y su ejecución detallada"** en la que se encuentran todas los créditos presupuestarios del Estado nacional. Estos montos fueron deflactados para poder ser comparados en un contexto de inflación.

- Para el cálculo de las tasas de **Desempleo, Informalidad y Subocupación** utilizamos los resultados de la **[Encuesta Permanente de Hogares (EPH)](https://www.indec.gob.ar/indec/web/Institucional-Indec-BasesDeDatos)** llevada a cabo por el **INDEC**. Para suplir la ausencia de datos del INDEC, correspondientes al cuarto trimestre de 2015, estimamos esos valores a traves de una interpolación lineal.

## Resultados

Como resultado encontramos una correlación negativa entre los montos invertidos en políticas laborales y las tasas calculadas. Es decir que estadísticamente en los periodos analizados **a mayor presupuesto invertido los valores de Desempleo, Informalidad y Subocupación tienden a disminuir**.

Las conclusiones principales del trabajo destacamos el rol fundamental que cumple el estado en la composición del empleo, la necesidad de acompañar este tipo de trabajos con otros análisis con un enfoque cualitativo y que la metodología desarrollada puede aplicarse en otras investigaciones del estilo, analizando otras funciones de los créditos presupuestarios o desagregando por distintos tipos de poblaciones en la EPH.

## Jornadas Argentinas de Informática

Como último paso de este proyecto, presentamos este trabajo en el Concurso de Trabajos Estudiantiles de las **[54° Jornadas Argentinas de Informática (JAIIO)](https://54jaiio.sadio.org.ar/)**, logrando formular el trabajo realizado en un formáto de artículo científico y compartiendo nuestra experiencia de trabajo interdisciplinario en ciencias sociales computacionales con otros investigadores y estudiantes.

## Links

Para más detalles les dejo los siguientes links:

**[Repositorio de GitHub con notebooks, documentación, scripts y gráficos](https://github.com/ezeluduena/socio-hackathon)**

**[Artículo presentado en las 54° JAIIO](https://revistas.unlp.edu.ar/JAIIO/article/view/19907)**

**[Poster presentado en las 54° JAIIO](/blog/es/poniendo_a_trabajar_a_los_numeros/Poster_JAIIO.pdf)**
