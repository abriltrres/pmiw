class Jugador {
  constructor() {
    this.carril = 1;
    this.carrilesX = [270, 400, 560];
    this.y = 311;
    this.ancho = 150;
    this.alto = 68;
  }

  mover(tecla) {
    if (tecla == LEFT_ARROW && this.carril > 0) {
      this.carril--;
    }

    if (tecla == RIGHT_ARROW && this.carril < 2) {
      this.carril++;
    }
  }

  mostrar() {
    // dibujo el auto en el carril que corresponde
    image(imagenAuto, this.carrilesX[this.carril] - this.ancho / 2, this.y, this.ancho, this.alto);
  }

  reiniciar() {
    this.carril = 1;
  }
}
