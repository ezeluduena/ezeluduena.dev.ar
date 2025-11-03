---
title: 'Poniendo a trabajar a los números'
date: '2025-08-07'
description: 'Este trabajo analiza la relación del presupuesto ejecutado por el estado nacional argentino en políticas laborales y los indicadores sociales de desempleo,  subocupación e informalidad durante los períodos de gobierno 2011-2015 y (2015-2019). Se utilizó la base de datos de Presupuesto Abierto del Ministerio de Economía para filtrar los montos invertidos con la función de promover el trabajo. Para el cálculo de las tasas laborales se consideraron los resultados de la EPH del INDEC. Este artículo también describe detalladamente la metodología utilizada para el estudio de grandes bases de datos gubernamentales abiertas, la reproducción de indicadores sociales públicos, el proceso de deflactación de valores (necesario al comparar montos presupuestarios ejecutados en un contexto inflacionario) y la estimación de datos faltantes utilizando interpolación numérica.'
comment_section_title: 'Putting the numbers to work'
---

Motivated by the difficulties we face in Argentina in finding quality jobs, the recurring economic crises, and the ongoing debate in recent years about the role of the State in society, we set out to explore **to what extent does the national budget for employment policies affect labor statistics?**

To this end, we selected **the government periods 2011–2015 and 2015–2019, under the presidencies of Cristina Fernández and Mauricio Macri**, respectively. These administrations were particularly interesting because they occurred in a relatively stable global and social context, avoiding, for instance, the COVID-19 pandemic, and represented a clear contrast in terms of the labor and economic policies they implemented. Based on this selection, **we analyzed the relationship between the executed budget for the “Labor” function and the indicators of unemployment, informality, and underemployment.**

This work was developed by **Ezequiel Ludueña (myself), Manuel Barragán, Micaela de Hernández, and Marco Spalleti**, in the context of the [SocioHackathon](https://sociales.unc.edu.ar/content/todav-est-s-tiempo-de-presentarte-en-el-i-socio-hackathon-investigar-en-sociales-2024-la) organized by the Faculty of Social Sciences of the National University of Córdoba last year. Our team, composed of members from Computer Science, Political Science, and Sociology, approached this research question using large public datasets and achieved **[first prize](https://sociales.unc.edu.ar/content/i-socio-hackathon-investigar-en-sociales-2024-ya-se-conocen-les-ganadores-del-concurso)**.

## Data

- To obtain the amount invested in labor policies, we used the **[Open Budget](https://www.presupuestoabierto.gob.ar/sici/datos-abiertos)** database from the **Ministry of Economy**, specifically the dataset **“Detailed expenditure budget and execution”**, which contains all national government budget allocations. These amounts were deflated to allow comparison in an inflationary context.

- For the calculation of **unemployment, informality, and underemployment rates**, we used data from the **[Permanent Household Survey (EPH)](https://www.indec.gob.ar/indec/web/Institucional-Indec-BasesDeDatos)** conducted by **INDEC**. To address the absence of INDEC data for the fourth quarter of 2015, we estimated those values through linear interpolation.

## Results

As a result, we found a negative correlation between the amounts invested in labor policies and the calculated rates. In other words, during the analyzed periods, **higher investment in employment-related policies statistically corresponds with lower rates of unemployment, informality, and underemployment**.

Our main conclusions highlight the fundamental role of the State in shaping employment, the need to complement this type of quantitative analysis with qualitative approaches, and the potential to apply our methodology to other areas, such as analyzing different budget functions or focusing on specific population groups within the EPH.

## Argentine Conference on Informatics (JAIIO)

As the final step of this project, we presented our work in the Student Paper Contest at the **[54th Argentine Conference on Informatics (JAIIO)](https://54jaiio.sadio.org.ar/)**. There, we formalized our research in a scientific article format and shared our interdisciplinary experience in computational social sciences with other researchers and students.

## Links

For more details, you can visit the following links:

- **[GitHub repository with notebooks, documentation, scripts, and visualizations](https://github.com/ezeluduena/socio-hackathon)**
- **[Article presented at the 54th JAIIO](https://revistas.unlp.edu.ar/JAIIO/article/view/19907)**
- **[Poster presented at the 54th JAIIO](/blog/es/poniendo_a_trabajar_a_los_numeros/Poster_JAIIO.pdf)**
