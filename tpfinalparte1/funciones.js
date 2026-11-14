// historia

function procesarClick() {
  if (pantalla == -1) {
    if (creditosAbiertos) {
      if (dentroDe(BTN_VOLVER)) creditosAbiertos = false;
    } else if (dentroDe(BTN_JUGAR)) {
      pantalla = 0;
    } else if (dentroDe(BTN_CREDITOS)) {
      creditosAbiertos = true;
    }
  } else if (siguiente[pantalla] != -1) {
    pantalla = siguiente[pantalla];
  } else if (pantalla == 3) {
    if (dentroDe(BTN_AUTO)) pantalla = 4;
  } else if (pantalla == 4) {
    if (dentroDe(BTN_SI)) pantalla = 5;
    else if (dentroDe(BTN_NO)) pantalla = 7;
  } else if (pantalla == 9) {
    if (dentroDe(BTN_ACEPTAR)) pantalla = 10;
  } else if (pantalla == 10) {
    if (dentroDe(BTN_CHETO)) pantalla = 11;
    else if (dentroDe(BTN_FEO)) pantalla = 12;
  } else if (pantalla == 15) {
    if (dentroDe(BTN_FENTANILO)) pantalla = 19;
    else if (dentroDe(BTN_PUERTASECRETA)) pantalla = 20;
  } else if (esFinal(pantalla)) {
    if (dentroDe(BTN_REINICIAR)) reiniciar();
  }
}

// los 3 finales
function esFinal(p) {
  return p == 17 || p == 18 || p == 24;
}

// vuelve todo al inicio
function reiniciar() {
  pantalla = -1;
  creditosAbiertos = false;
  estado = "quieto";
  personajeX = 80;
  frameCaminar = 0;
  frameSalto = 0;
  ultimoCambioFrame = millis();
  ultimoCambioSalto = millis();
}

function mostrarPantalla(p) {
  // zona clickeable
  if (p == 3) {
    dibujarZona(BTN_AUTO);
  } else if (p == 10) {
    dibujarZona(BTN_CHETO);
    dibujarZona(BTN_FEO);
  } else if (p == 15) {
    dibujarZona(BTN_FENTANILO);
    dibujarZona(BTN_PUERTASECRETA);
  }

  mostrarTexto(textos[p]);

  if (p == 4) {
    mostrarBotonesSiNo();
  } else if (p == 9) {
    mostrarBoton(BTN_ACEPTAR);
  } else if (esFinal(p)) {
    dibujarBoton(BTN_REINICIAR);
  }
}

function mostrarFondo(numero) {
  background(0);
  image(imagenes[numero], 0, 0, 800, 450);
}

function mostrarTexto(texto) {
  fill(0);
  rect(29, 368, 740, 70);

  fill(255);
  textFont(miFuente4);
  textSize(20);
  textAlign(LEFT, TOP);
  text(texto, 35, 375);
}

// se ilumina cuando pasa el mouse
function dibujarZona(zona) {
  if (dentroDe(zona)) {
    noStroke();
    fill(255, 255, 255, 70);
    rect(zona.x, zona.y, zona.w, zona.h);
  }
}

// botones

function dentroDe(btn) {
  return mouseX > btn.x && mouseX < btn.x + btn.w &&
         mouseY > btn.y && mouseY < btn.y + btn.h;
}

// botones inicio y REINICIAR
function dibujarBoton(btn) {
  let hover = dentroDe(btn);
  strokeWeight(2);
  stroke(180);
  if (hover) {
    fill(0, 47, 130);
  } else {
    fill(79, 92, 182);
  }
  rect(btn.x, btn.y, btn.w, btn.h, 8);

  noStroke();
  fill(255);
  textFont(miFuente2);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// botones la historia (SI, NO, aceptar)
function mostrarBoton(btn) {
  fill(255);
  rect(btn.x, btn.y, btn.w, btn.h);
  fill(0);

  textFont(miFuente4);
  textSize(20);
  textAlign(CENTER, CENTER);
  let cx = btn.x + btn.w / 2;
  let cy = btn.y + btn.h / 2;
  text(btn.label, cx, cy);
}

function mostrarBotonesSiNo() {
  mostrarBoton(BTN_SI);
  mostrarBoton(BTN_NO);
}

// personaje

function dibujarInicio() {
  background(173, 230, 238);

  let anchoSuelo = 800;
  let altoSuelo = anchoSuelo * imgSuelo.height / imgSuelo.width;
  image(imgSuelo, 0, height - altoSuelo + 40, anchoSuelo, altoSuelo);

  for (let i = 0; i < 5; i++) {
    posicionesX[i] -= velocidadesNube[i];

    if (posicionesX[i] + anchosNube[i] < 0) {
      posicionesX[i] = width;
    }

    let alto = anchosNube[i] * imgNube.height / imgNube.width;
    image(imgNube, posicionesX[i], posicionesY[i], anchosNube[i], alto);
  }

  textFont(miFuente3);
  textSize(42);
  textAlign(CENTER, CENTER);
  stroke(0, 47, 130);
  strokeWeight(2);
  fill(255);
  text("pole position: bizarre", width / 2, 45);
  noStroke();

  dibujarPersonaje();

  if (creditosAbiertos) {
    noStroke();
    fill(0, 0, 0, 190);
    rect(160, 105, 480, 250, 12);

    textFont(miFuente3);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(30);
    text("CRÉDITOS", width / 2, 140);
    textFont(miFuente4);
    textSize(20);
    text("Alumnas: Delfina Sánchez y Abril Torres", width / 2, 190);
    text("Autores: Delfina Sánchez y Abril Torres", width / 2, 230);
    text("Docente: Leo Garay", width / 2, 270);
    dibujarBoton(BTN_VOLVER);
  } else {
    dibujarBoton(BTN_JUGAR);
    dibujarBoton(BTN_CREDITOS);
  }
}

//flechas 
function actualizarEstado() {
  if (estado != "saltar") {
    if (keyIsDown(RIGHT_ARROW)) {
      estado = "caminarDer";
    } else if (keyIsDown(LEFT_ARROW)) {
      estado = "caminarIzq";
    } else {
      estado = "quieto";
    }
  }
}

// maquina de estados del personaje
function dibujarPersonaje() {
  actualizarEstado();

  let animacion = salto;
  let indice = 0;
  let elevacion = 0;

  switch (estado) {
    case "caminarDer":
      caminar(caminarDerecha, 1);
      animacion = caminarDerecha;
      indice = frameCaminar;
      break;

    case "caminarIzq":
      caminar(caminarIzquierda, -1);
      animacion = caminarIzquierda;
      indice = frameCaminar;
      break;

    case "saltar":
      if (millis() - ultimoCambioSalto >= intervaloFrame) {
        ultimoCambioSalto = millis();
        if (frameSalto < salto.length - 1) {
          frameSalto++;
        } else {
          estado = "quieto";
          frameSalto = 0;
        }
      }
      animacion = salto;
      indice = frameSalto;
      elevacion = ALTURAS_SALTO[frameSalto];
      break;

    case "quieto":
      frameCaminar = 0;
      ultimoCambioFrame = millis();
      break;
  }

  dibujarFrame(animacion, indice, personajeX, height * 0.90, anchoPersonaje, elevacion);
}


function caminar(frames, direccion) {
  frameCaminar = actualizarFrame(frames, frameCaminar, intervaloFrame);
  personajeX += velocidadMovimiento * direccion;

  if (personajeX > width) {
    personajeX = -anchoPersonaje;
  } else if (personajeX + anchoPersonaje < 0) {
    personajeX = width;
  }
}

function actualizarFrame(frames, indice, intervalo) {
  if (millis() - ultimoCambioFrame >= intervalo) {
    indice++;
    if (indice >= frames.length) {
      indice = 0;
    }
    ultimoCambioFrame = millis();
  }
  return indice;
}

function dibujarFrame(frames, indice, x, baseY, ancho, elevacion) {
  let imagen = frames[indice];
  let alto = ancho * imagen.height / imagen.width;
  image(imagen, x, baseY - alto - elevacion, ancho, alto);
}

// musica

function iniciarMusica(sonido, volumen) {
  if (!musicaIniciada) {
    sonido.setVolume(volumen);
    sonido.loop();
    musicaIniciada = true;
  }
}
