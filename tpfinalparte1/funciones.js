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
    return;
  }
  if (pantalla == 0) {
    pantalla = 1;
  } else if (pantalla == 1) {
    pantalla = 2;
  } else if (pantalla == 2) {
    pantalla = 3;
  } else if (pantalla == 3) {
    if (dentroDe(BTN_AUTO)) pantalla = 4;
  } else if (pantalla == 4) {
    if (dentroDe(BTN_SI)) pantalla = 5;
    else if (dentroDe(BTN_NO)) pantalla = 7;
  } else if (pantalla == 7) {
    pantalla = 6;
  } else if (pantalla == 6) {
    pantalla = 3;
  } else if (pantalla == 5) {
    pantalla = 8;
  } else if (pantalla == 8) {
    pantalla = 9;
  } else if (pantalla == 9) {
    if (dentroDe(BTN_ACEPTAR)) pantalla = 10;
  } else if (pantalla == 10) {
    if (dentroDe(BTN_CHETO)) pantalla = 11;
    else if (dentroDe(BTN_FEO)) pantalla = 12;
  } else if (pantalla == 11) {
    pantalla = 13;
  } else if (pantalla == 12) {
    pantalla = 14;
  } else if (pantalla == 13) {
    pantalla = 16;
  } else if (pantalla == 14) {
    pantalla = 15;
  } else if (pantalla == 15) {
    if (dentroDe(BTN_FENTANILO)) pantalla = 19;
    else if (dentroDe(BTN_PUERTASECRETA)) pantalla = 20;
  } else if (pantalla == 19) {
    pantalla = 21;
  } else if (pantalla == 16) {
    pantalla = 22;
  } else if (pantalla == 20) {
    pantalla = 23;
  } else if (pantalla == 21) {
    pantalla = 18;
  } else if (pantalla == 22) {
    pantalla = 24;
  } else if (pantalla == 23) {
    pantalla = 17;
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

  if (p == 0) {
    mostrarTexto("Trabajás en una estación de servicio YPF.");
  } else if (p == 1) {
    mostrarTexto("Macri tiene un auto deportivo increíble...");
  } else if (p == 2) {
    mostrarTexto("Macri se va a comprar medialunas.");
  } else if (p == 3) {
    mostrarTexto("El auto de Macri quedó solo...");
  } else if (p == 4) {
    mostrarTexto("¿Qué vas a hacer? ¿Robar el auto?");
    mostrarBotonesSiNo();
  } else if (p == 5) {
    mostrarTexto("Te das a la fuga hasta México. Macri está enojado.");
  } else if (p == 7) {
    mostrarTexto("Macri te dice: \"¡Gracias, pibe!\" y se va.");
  } else if (p == 6) {
    mostrarTexto("Macri vuelve después de unos días.");
  } else if (p == 8) {
    mostrarTexto("Llegás a Miami y encontrás por Facebook una publicación\npara competir en una carrera.");
  } else if (p == 9) {
    mostrarTexto("¿Aceptás participar en la carrera?");
    mostrarBoton(BTN_ACEPTAR);
  } else if (p == 10) {
    mostrarTexto("Antes de la carrera querés salir de joda, tenés dos opciones.");
  } else if (p == 11) {
    mostrarTexto("Caés a una joda y te encontrás al mismísimo...");
  } else if (p == 12) {
    mostrarTexto("Caés a una joda y te encontrás a la mismísima...");
  } else if (p == 13) {
    mostrarTexto("Ricardo Fort, que te dice: \"Vamos, pibe, bailás bien, quedate toda\nla noche conmigo\".");
  } else if (p == 14) {
    mostrarTexto("Mirtha Legrand, que te dice: \"La noche es joven... te puedo ofrecer\nlo que tomé yo para aguantar tanto tiempo\".");
  } else if (p == 15) {
    mostrarTexto("Te ofrece una misteriosa medicina...");
  } else if (p == 16) {
    mostrarTexto("En un flash se hace hora de la carrera, esperás a que den las\nluces para acelerar.");
  } else if (p == 19) {
    mostrarTexto("No sabés cómo, pero se hace hora de la carrera, esperás a que\nden las luces para acelerar.");
  } else if (p == 20) {
    mostrarTexto("Descansaste, se hace hora de la carrera, esperás a que den\nlas luces para acelerar.");
  } else if (p == 21) {
    mostrarTexto("El fentanilo que te ofreció Mirtha empieza a hacer efecto, se\nte duermen las piernas y chocás.");
  } else if (p == 22) {
    mostrarTexto("Estás con mucha resaca y no podés terminar la carrera.");
  } else if (p == 23) {
    mostrarTexto("Evitaste todas las distracciones e hiciste una carrera estupenda.");
  } else if (p == 24) {
    mostrarTexto("FINAL: No importa, Ricardo compró el primer lugar y terminaste\nganando. ¡Bailás muy bien!");
  } else if (p == 17) {
    mostrarTexto("FINAL: Ganaste la carrera con total honestidad. ¡Sos un campeón!");
  } else if (p == 18) {
    mostrarTexto("FINAL: Perdiste. El fentanilo te dejó fuera de carrera...");
  }

  if (esFinal(p)) {
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
