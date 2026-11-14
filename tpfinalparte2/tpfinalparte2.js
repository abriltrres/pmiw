// POLE POSITION: BIZARRE
// TP final parte 2 - comision 4 - profesor: Leo Garay
// Alumnas: Abril Torres y Delfina Sánchez
let musicaFondo;
let juego;

let imagenFondoInicio;
let imagenFondo1, imagenFondo2, imagenFondo3;
let imagenFondoNitro1, imagenFondoNitro2, imagenFondoNitro3;
let imagenAuto;
let fuenteTitulo;
let fuenteCartel;
let fuenteTexto;
let imagenesAutosRivales = [];

function preload() {
  imagenFondoInicio = loadImage("pantallainicio1.jpg");
  imagenFondo1 = loadImage("fondo4.jpg");
  imagenFondo2 = loadImage("fondo5.jpg");
  imagenFondo3 = loadImage("fondo6.jpg");
  imagenFondoNitro1 = loadImage("fondo7.jpg");
  imagenFondoNitro2 = loadImage("fondo8.jpg");
  imagenFondoNitro3 = loadImage("fondo9.jpg");

  imagenAuto = loadImage("auto.png");
  fuenteTitulo = loadFont("fast99.ttf");
  fuenteCartel = loadFont("Anton-Regular.ttf");
  fuenteTexto = loadFont("OpenSans-Regular.ttf");
  imagenesAutosRivales[0] = loadImage("autorival.png");
  imagenesAutosRivales[1] = loadImage("autoverde.png");
  imagenesAutosRivales[2] = loadImage("autoazul.png");

  musicaFondo = loadSound("sonidos/musica.mp3");
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.mostrar();
}

function keyPressed() {
  juego.teclaPresionada(keyCode);
}

function mousePressed() {
  juego.mousePresionado();
}
