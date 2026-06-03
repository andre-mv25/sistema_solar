const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views/img')));

const sol = {
    nombre: 'Sol', slug: 'sol', imagen: '/sol.webp', descripcion: 'La estrella de nuestro sistema solar', color: '#f9d423',
    radio: '696,340 km', temperatura: '5,505 °C (superficie)', distanciaTierra: '149.6 millones km',
    tipo: 'Estrella enana amarilla (G2V)', edad: '4,600 millones años', masa: '1.989 × 10³⁰ kg',
    info: 'El Sol es una estrella de tipo espectral G2V que contiene más del 99.8% de la masa total del sistema solar. Su energía es producida mediante fusión nuclear en su núcleo, donde el hidrógeno se convierte en helio a temperaturas de aproximadamente 15 millones de grados Celsius. Esta energía es la responsable de sostener toda la vida en la Tierra y de gobernar los climas y las estaciones de todos los planetas.'
};

const planetas = [
    { nombre: 'Mercurio', slug: 'mercurio', imagen: '/mercurio.webp', descripcion: 'El más cercano al Sol', color: '#b0b0b0', radio: '2,439.7 km', distanciaSol: '57.9 millones km', periodoOrbital: '88 días', lunas: 0, gravedad: '3.7 m/s²', tipo: 'Rocoso', info: 'Mercurio es el planeta más pequeño del sistema solar y el más cercano al Sol. Su superficie está llena de cráteres, similar a nuestra Luna, y carece de una atmósfera significativa. Durante el día las temperaturas alcanzan los 430 °C, mientras que por la noche descienden a -180 °C, una variación extrema que ningún otro planeta experimenta.' },
    { nombre: 'Venus', slug: 'venus', imagen: '/venus.webp', descripcion: 'El más caliente', color: '#e8cda0', radio: '6,051.8 km', distanciaSol: '108.2 millones km', periodoOrbital: '225 días', lunas: 0, gravedad: '8.87 m/s²', tipo: 'Rocoso', info: 'Venus es el planeta más caliente del sistema solar con temperaturas de hasta 465 °C, debido a un efecto invernadero descontrolado causado por su densa atmósfera de dióxido de carbono. Gira en sentido contrario a la mayoría de los planetas y su día es más largo que su año. Es often llamado el "gemelo" de la Tierra por su tamaño y masa similares.' },
    { nombre: 'Tierra', slug: 'tierra', imagen: '/tierra.webp', descripcion: 'Nuestro planeta', color: '#4b9cd3', radio: '6,371 km', distanciaSol: '149.6 millones km', periodoOrbital: '365.25 días', lunas: 1, gravedad: '9.81 m/s²', tipo: 'Rocoso', info: 'La Tierra es el único planeta conocido que alberga vida. Su atmósfera rica en nitrógeno y oxígeno, junto con la presencia de agua líquida en su superficie, crean las condiciones perfectas para la vida. Posee un campo magnético que la protege de la radiación solar y una Luna que estabiliza su eje de rotación, regulando las estaciones.' },
    { nombre: 'Marte', slug: 'marte', imagen: '/marte.webp', descripcion: 'El planeta rojo', color: '#c1440e', radio: '3,389.5 km', distanciaSol: '227.9 millones km', periodoOrbital: '687 días', lunas: 2, gravedad: '3.72 m/s²', tipo: 'Rocoso', info: 'Marte debe su color rojizo al óxido de hierro (herrumbre) en su superficie. Tiene el volcán más grande del sistema solar, el Monte Olimpo, con 21.9 km de altura, y el cañón más grande, Valles Marineris. Su delgada atmósfera es principalmente dióxido de carbono, y se han encontrado evidencias de que antiguamente tuvo agua líquida.' },
    { nombre: 'Júpiter', slug: 'jupiter', imagen: '/jupiter.webp', descripcion: 'El más grande', color: '#d4a574', radio: '69,911 km', distanciaSol: '778.5 millones km', periodoOrbital: '11.86 años', lunas: 95, gravedad: '24.79 m/s²', tipo: 'Gaseoso', info: 'Júpiter es el planeta más grande del sistema solar, con una masa 318 veces la de la Tierra. Su característica más distintiva es la Gran Mancha Roja, una tormenta anticiclónica más grande que nuestro planeta que ha durado cientos de años. Está compuesto principalmente de hidrógeno y helio, y no tiene una superficie sólida definida.' },
    { nombre: 'Saturno', slug: 'saturno', imagen: '/saturno.webp', descripcion: 'El de los anillos', color: '#ead6b8', radio: '58,232 km', distanciaSol: '1,434 millones km', periodoOrbital: '29.46 años', lunas: 146, gravedad: '10.44 m/s²', tipo: 'Gaseoso', info: 'Saturno es famoso por su impresionante sistema de anillos compuestos de hielo y roca, que se extienden hasta 282,000 km pero tienen solo unos 10 metros de espesor. Es el planeta menos denso del sistema solar; de hecho, flotaría en el agua. Su atmósfera es similar a la de Júpiter y tiene 146 lunas conocidas, incluyendo Titán, que tiene su propia atmósfera.' },
    { nombre: 'Urano', slug: 'urano', imagen: '/urano.webp', descripcion: 'El inclinado', color: '#7ec8e3', radio: '25,362 km', distanciaSol: '2,871 millones km', periodoOrbital: '84 años', lunas: 27, gravedad: '8.87 m/s²', tipo: 'Helado', info: 'Urano es único porque su eje de rotación está inclinado aproximadamente 98 grados, lo que significa que prácticamente "rueda" alrededor del Sol. Es un gigante helado compuesto de agua, metano y amoníaco congelados, lo que le da su característico color azul verdoso. Tiene un sistema de anillos tenues y 27 lunas conocidas.' },
    { nombre: 'Neptuno', slug: 'neptuno', imagen: '/neptuno.webp', descripcion: 'El más lejano', color: '#3b5c9a', radio: '24,622 km', distanciaSol: '4,495 millones km', periodoOrbital: '164.8 años', lunas: 16, gravedad: '11.15 m/s²', tipo: 'Helado', info: 'Neptuno es el planeta más ventoso del sistema solar, con vientos que alcanzan los 2,100 km/h. Fue el primer planeta descubierto mediante cálculos matemáticos antes de ser observado directamente. Su color azul intenso se debe a la absorción de luz roja por el metano en su atmósfera. Tiene 16 lunas conocidas, siendo Tritón la más grande.' },
];

const paginas = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Acerca de', ruta: '/acerca' },
];

const cuerposCelestes = [sol, ...planetas];

app.get('/', (_req, res) => {
    res.render('index', { titulo: 'Sistema Solar', sol, planetas, paginas, paginaActual: '/' });
});

app.get('/sol', (_req, res) => {
    res.render('planeta', { titulo: sol.nombre, planeta: sol, planetas, paginas, paginaActual: '/sol' });
});

app.get('/planeta/:slug', (req, res) => {
    const planeta = planetas.find(p => p.slug === req.params.slug);
    if (!planeta) {
        return res.status(404).render('404', { titulo: 'Planeta no encontrado', paginas, paginaActual: '' });
    }
    res.render('planeta', { titulo: planeta.nombre, planeta, planetas, paginas, paginaActual: `/planeta/${planeta.slug}` });
});

app.get('/acerca', (_req, res) => {
    res.render('acerca', { titulo: 'Acerca de', planetas, paginas, paginaActual: '/acerca' });
});

app.use((_req, res) => {
    res.status(404).render('404', { titulo: 'Página no encontrada', paginas, paginaActual: '' });
});

app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).send('Error interno del servidor');
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});
