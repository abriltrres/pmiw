//tpfinalparte1 - comision 4 - profesor: Leo Garay
// Alumnas: Delfina Sánchez y Abril Torres
let miFuente2;
let miFuente3;
let miFuente4;
let pantalla = -1;
let creditosAbiertos = false;
let imagenes = [];
let imgNube;
let imgSuelo;
let caminarDerecha = [];
let caminarIzquierda = [];
let salto = [];
let posicionesX = [20, 170, 330, 490, 680];
let posicionesY = [40, 100, 25, 75, 35];
let anchosNube = [70, 100, 85, 120, 60];
let velocidadesNube = [0.5, 0.8, 0.6, 1, 0.7];
let personajeX = 80;
// estados: quieto, caminarDer, caminarIzq, saltar
let estado = "quieto";
let frameCaminar = 0;
let ultimoCambioFrame = 0;
let frameSalto = 0;
let ultimoCambioSalto = 0;
let musicaFondo;
let musicaIniciada = false;

const BTN_SI    = { x: 250, y: 300, w: 100, h: 50, label: "SI" };
const BTN_NO    = { x: 450, y: 300, w: 100, h: 50, label: "NO" };
const BTN_AUTO   = { x: 200, y: 150, w: 400, h: 250 };
const BTN_ACEPTAR = { x: 326, y:265, w:135, h:50, label: "aceptar"};
const BTN_CHETO  = { x: 211,   y: 238,   w: 56 ,   h: 80  };
const BTN_FEO  = { x: 586 ,   y: 248,   w: 60 ,   h: 80  };
const BTN_JUGAR  = { x: 300, y: 130, w: 200, h: 60, label: "JUGAR" };
const BTN_CREDITOS = { x: 300, y: 205, w: 200, h: 55, label: "CREDITOS" };
const BTN_VOLVER = { x: 300, y: 305, w: 200, h: 50, label: "VOLVER" };
const BTN_FENTANILO = { x: 350 , y: 117, w: 70, h:150};
const BTN_PUERTASECRETA = {x: 598 , y: 149, w:60, h: 80};
const BTN_REINICIAR = { x: 300, y: 233, w: 280, h: 60, label: "REINICIAR" };
const intervaloFrame = 120;
const anchoPersonaje = 100;
const velocidadMovimiento = 2;
const ALTURAS_SALTO = [0, 20, 45, 45, 20];

function preload() {
  miFuente2 = loadFont("data/FrescoStamp.ttf");
  miFuente3 = loadFont("data/Anton-Regular.ttf");
  miFuente4 = loadFont("data/OpenSans-Regular.ttf");
  imagenes[0]  = loadImage("ypf.jpg");
  imagenes[1]  = loadImage("macriauto.jpg");
  imagenes[2]  = loadImage("macri_medialunas.jpg");
  imagenes[3]  = loadImage("robar.jpg");
  imagenes[4]  = loadImage("decision.jpg");
  imagenes[5]  = loadImage("macritriste.jpg");
  imagenes[6]  = loadImage("macrivuelve.jpg");
  imagenes[7]  = loadImage("graciaspibe.jpg");
  imagenes[8]  = loadImage("miami.jpeg");
  imagenes[9]  = loadImage("facebook.jpg");
  imagenes[10] = loadImage("boliche.jpg");
  imagenes[11] = loadImage("bolichecheto.jpg");
  imagenes[12] = loadImage("bolichefeo.jpg");
  imagenes[13] = loadImage("bolichericardo.jpg");
  imagenes[14] = loadImage("bolichefentanilo.jpg");
  imagenes[15] = loadImage("fentanilo.jpg");
  imagenes[16] = loadImage("poleposition.jpeg");
  imagenes[17] = loadImage("ganaste.jpeg");
  imagenes[18] = loadImage("perdiste.jpg");
  imagenes[19] = loadImage("poleposition2.jpeg");
  imagenes[20] = loadImage("poleposition3.jpeg");
  imagenes[21] = loadImage("carrera.jpeg");
  imagenes[22] = loadImage("carrera2.jpeg");
  imagenes[23] = loadImage("carrera3.jpeg");
  imagenes[24] = loadImage("ganastetrampa.jpeg");
  for (let i = 1; i <= 3; i++) {
    caminarDerecha.push(loadImage("sprites/caminarder" + i + ".png"));
    caminarIzquierda.push(loadImage("sprites/caminarizq" + i + ".png"));
  }
  for (let i = 1; i <= 5; i++) {
    salto.push(loadImage("sprites/salto" + i + ".png"));
  }
  imgNube = loadImage("sprites/nube.png");
  imgSuelo = loadImage("sprites/fondo2.png");
  musicaFondo = loadSound("sonidos/musica.mp3");
}

function setup() {
  createCanvas(800, 450);
}

function keyPressed() {
  iniciarMusica(musicaFondo, 0.3);
  if (keyCode == UP_ARROW && pantalla == -1 && estado != "saltar") {
    estado = "saltar";
    frameSalto = 0;
    ultimoCambioSalto = millis();
  }
}

function draw() {
  if (pantalla == -1) {
    dibujarInicio();
  } else {
    mostrarFondo(pantalla);
    mostrarPantalla(pantalla);
  }

  if (pantalla == 4 && (dentroDe(BTN_SI) || dentroDe(BTN_NO))) {
    cursor(HAND);
  } else if (pantalla == 3 && dentroDe(BTN_AUTO)) {
    cursor(HAND);
  } else if (pantalla == 9 && dentroDe(BTN_ACEPTAR)) {
    cursor(HAND);
  } else if (pantalla == -1 && (
    (creditosAbiertos && dentroDe(BTN_VOLVER)) ||
    (!creditosAbiertos && (dentroDe(BTN_JUGAR) || dentroDe(BTN_CREDITOS)))
  )) {
    cursor(HAND);
  } else if (pantalla == 10 && (dentroDe(BTN_FEO) || dentroDe(BTN_CHETO))) {
    cursor(HAND);
  } else if (pantalla == 15 && (dentroDe(BTN_FENTANILO) || dentroDe(BTN_PUERTASECRETA))) {
    cursor(HAND);
  } else if (esFinal(pantalla) && dentroDe(BTN_REINICIAR)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  iniciarMusica(musicaFondo, 0.3);
}

function mouseClicked() {
  procesarClick();
}

