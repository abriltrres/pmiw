class AutoRival {
  constructor(carril) {
    this.imagen = imagenesAutosRivales[floor(random(0, 3))];
    this.carril = carril;
    this.profundidad = 0;
    this.velocidad = random(0.005, 0.0065);
    this.carrilesX = [240, 400, 598];
    this.terminado = false;
  }

  actualizar(acelerando) {
    let multiplicador = 1;
    if (acelerando) {
      multiplicador = 3.5;
    }

    this.profundidad += this.velocidad * multiplicador;

    if (this.profundidad >= 2.4) {
      this.terminado = true;
    }
  }

  colisionaCon(jugador) {
    if (this.carril != jugador.carril) {
      return false;
    }

    return this.profundidad >= 0.70 && this.profundidad <= 0.92;
  }

  mostrar() {
    // cuanto mas cerca esta el auto, mas abajo y mas grande se ve
    let profundidadHorizontal = this.profundidad;
    if (profundidadHorizontal > 1) {
      profundidadHorizontal = 1;
    }
    let x = lerp(width / 2, this.carrilesX[this.carril], profundidadHorizontal);
    let y = lerp(200, 395, this.profundidad);

    let escala = lerp(0.035, 0.75, this.profundidad);
    let ancho = 208 * escala;
    let alto = 94 * escala;

    image(this.imagen, x - ancho / 2, y - alto / 2, ancho, alto);
  }
}
