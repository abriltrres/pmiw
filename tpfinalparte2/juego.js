class Juego {
  constructor() {
    this.fondo = new Fondo();
    this.jugador = new Jugador();
    this.autos = [];

    this.tiempoUltimoAuto = 0;
    this.intervaloAutos = 1000;

    this.estado = "inicio";
    this.duracion = 30;
    this.inicioPartida = 0;

    this.botonJugar = new Boton("JUGAR", width / 2 - 75, 290, 150, 45);
    this.botonCreditos = new Boton("CRÉDITOS", width / 2 - 75, 345, 150, 40);
    this.botonReintentar = new Boton("REINTENTAR", width / 2 - 90, 260, 180, 50);
    this.botonJugarDeNuevo = new Boton("JUGAR DE NUEVO", width / 2 - 100, 260, 200, 50);
    this.botonCreditosFinal = new Boton("CRÉDITOS", width / 2 - 75, 325, 150, 40);
    this.botonVolver = new Boton("VOLVER", width / 2 - 75, 310, 150, 45);
  }

  actualizar() {
    if (this.estado == "jugando") {
      this.fondo.actualizar();
      this.generarAuto();

      let acelerando = keyIsDown(UP_ARROW);

      for (let i = 0; i < this.autos.length; i++) {
        this.autos[i].actualizar(acelerando);

        if (this.autos[i].colisionaCon(this.jugador)) {
          this.estado = "perdiste";
          musicaFondo.stop();
        }
      }

      // saco los autos que ya pasaron
      for (let i = this.autos.length - 1; i >= 0; i--) {
        if (this.autos[i].terminado) {
          this.autos.splice(i, 1);
        }
      }

      let tiempoTranscurrido = (millis() - this.inicioPartida) / 1000;

      if (tiempoTranscurrido >= this.duracion) {
        this.estado = "ganaste";
        musicaFondo.stop();
      }
    }
  }

  generarAuto() {
    if (millis() - this.tiempoUltimoAuto > this.intervaloAutos) {
      let carrilAleatorio = floor(random(0, 3));
      this.autos.push(new AutoRival(carrilAleatorio));

      this.tiempoUltimoAuto = millis();
      this.intervaloAutos = random(1000, 1500);
    }
  }

  mostrar() {
    if (this.estado == "inicio") {
      this.mostrarPantallaInicio();
    } else if (this.estado == "jugando") {
      this.mostrarPantallaJuego();
    } else if (this.estado == "perdiste") {
      this.mostrarPantallaPerdiste();
    } else if (this.estado == "ganaste") {
      this.mostrarPantallaGanaste();
    } else if (this.estado == "creditos") {
      this.mostrarPantallaCreditos();
    }
  }

  mostrarPantallaInicio() {
    background(0);
    // imagen de fondo con transparencia
    tint(255, 150);
    image(imagenFondoInicio, 0, 0, width, height);
    noTint();

    fill(255);
    textAlign(CENTER, CENTER);

    textFont(fuenteTitulo);
    textSize(38);
    text("POLE POSITION: BIZARRE", width / 2, 65);

    textFont(fuenteTexto);
    textSize(16);
    text("Llegó la hora de la carrera en Miami. ¡Es tu oportunidad de ganar!", width / 2, 115);

    textSize(20);
    text("INSTRUCCIONES", width / 2, 160);
    textSize(16);
    text("Esquivá los autos rivales que aparecen en la carretera.", width / 2, 195);
    text("IZQUIERDA / DERECHA para moverte y ARRIBA para acelerar.", width / 2, 222);
    text("Sobreviví durante 30 segundos para ganar.", width / 2, 249);

    this.botonJugar.mostrar();
    this.botonCreditos.mostrar();
  }

  mostrarPantallaJuego() {
    this.fondo.mostrar();

    for (let i = 0; i < this.autos.length; i++) {
      this.autos[i].mostrar();
    }

    this.jugador.mostrar();

    let transcurrido = (millis() - this.inicioPartida) / 1000;
    let restante = ceil(this.duracion - transcurrido);
    if (restante < 0) {
      restante = 0;
    }

    fill(0, 180);
    noStroke();
    rect(10, 10, 250, 40);

    fill(255);
    textFont(fuenteTexto);
    textAlign(LEFT, CENTER);
    textSize(18);
    text("Tiempo: " + restante + " s", 20, 30);

    if (keyIsDown(UP_ARROW)) {
      textAlign(RIGHT, CENTER);
      textSize(15);
      text("NITRO", 245, 30);
    }
  }

  mostrarPantallaPerdiste() {
    background(10, 20, 25);
    fill(255, 50, 50);
    textAlign(CENTER, CENTER);
    textFont(fuenteCartel);
    textSize(40);
    text("¡CHOCASTE!", width / 2, 140);

    fill(255);
    textFont(fuenteTexto);
    textSize(20);
    text("Chocaste contra un auto rival.", width / 2, 200);

    this.botonReintentar.mostrar();
    this.botonCreditosFinal.mostrar();
  }

  mostrarPantallaGanaste() {
    background(10, 20, 25);
    fill(100, 255, 100);
    textAlign(CENTER, CENTER);
    textFont(fuenteCartel);
    textSize(40);
    text("¡GANASTE!", width / 2, 150);

    fill(255);
    textFont(fuenteTexto);
    textSize(20);
    text("¡Sobreviviste a la carrera!", width / 2, 205);

    this.botonJugarDeNuevo.mostrar();
    this.botonCreditosFinal.mostrar();
  }

  mostrarPantallaCreditos() {
    background(20);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(fuenteCartel);
    textSize(35);
    text("CRÉDITOS", width / 2, 90);

    textFont(fuenteTexto);
    textSize(18);
    text("POLE POSITION: BIZARRE", width / 2, 150);
    textSize(16);
    text("Alumnas: Abril Torres y Delfina Sánchez", width / 2, 195);
    text("Docente: Leo Garay - Comisión 4", width / 2, 222);

    this.botonVolver.mostrar();
  }

  teclaPresionada(tecla) {
    if (this.estado == "jugando") {
      this.jugador.mover(tecla);
    }
  }

  mousePresionado() {
    if (this.estado == "inicio") {
      if (this.botonJugar.estaAdentro()) {
        this.iniciarPartida();
      } else if (this.botonCreditos.estaAdentro()) {
        this.estado = "creditos";
      }
    } else if (this.estado == "perdiste") {
      if (this.botonReintentar.estaAdentro()) {
        this.iniciarPartida();
      } else if (this.botonCreditosFinal.estaAdentro()) {
        this.estado = "creditos";
      }
    } else if (this.estado == "ganaste") {
      if (this.botonJugarDeNuevo.estaAdentro()) {
        this.iniciarPartida();
      } else if (this.botonCreditosFinal.estaAdentro()) {
        this.estado = "creditos";
      }
    } else if (this.estado == "creditos") {
      if (this.botonVolver.estaAdentro()) {
        this.estado = "inicio";
      }
    }
  }

  iniciarPartida() {
    this.fondo.reiniciar();
    this.jugador.reiniciar();
    this.autos = [];

    this.inicioPartida = millis();
    this.tiempoUltimoAuto = millis();
    this.intervaloAutos = 1000;
    this.estado = "jugando";
    musicaFondo.stop();
    musicaFondo.loop();
  }
}
