export type Talk = {
    name: string;
    url: string;
    description?: string;
    date?: string;
    event?: string;
    event_url?: string;
    video_url?: string;
    slides_url?: string;
    with?: string;
    language?: string;
};

// TODO: add english locale
const talks: Talk[] = [
    {
        name: 'SOL3: Software Libre de gestión con Odoo Community para organizaciones',
        url: '/talks', //TODO: add talk blog
        description: 'Esta charla describe el programa SOL3 de la Fundación Mueve. Está dirigida tanto a personas interesadas en incorporar herramientas libres de gestión basadas en Odoo en sus organizaciones, como a desarrolladores/as que quieran involucrarse en el ecosistema de Odoo',
        date: '2026-04-25',
        event: 'FLISOL 2026, Córdoba, Argentina',
        event_url: 'https://librebase.org.ar/flisol-cordoba-2026/',
        slides_url: '/talks/programa_sol3.pdf',
        with: 'Araceli Acosta',
        video_url: 'https://www.youtube.com/watch?v=Mlv6Eh4_Ba0',
        language: 'Español'
    },
    {
        name: 'Todavía sirve: cómo armar tu propio servidor con una Conectar Igualdad',
        url: '/talks', //TODO: add talk blog
        description: 'En esta charla te contamos cómo utilizamos una netbook del programa Conectar Igualdad y YunoHost para implementar nuestro propio servidor casero con el objetivo de dejar de usar (o usar menos) servicios de terceros.',
        date: '2025-04-26',
        event: 'FLISOL 2025, Córdoba, Argentina',
        event_url: 'https://librebase.org.ar/flisol-cordoba-2025/',
        slides_url: '/talks/todavia_sirve.pdf',
        with: 'Sofía Perón Santana',
        language: 'Español'
    }
];

export const loadTalks = async function* () {
    for (const talk of talks) {
        yield talk;
    }
};
