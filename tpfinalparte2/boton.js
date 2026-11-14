class Boton {
  constructor(texto, x, y, ancho, alto) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  mostrar() {
    noStroke();
    if (this.estaAdentro()) {
      fill(120);
    } else {
      fill(80);
    }
    rect(this.x, this.y, this.ancho, this.alto);

    fill(255);
    textFont(fuenteTexto);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }

  estaAdentro() {
    return mouseX > this.x && mouseX < this.x + this.ancho &&
           mouseY > this.y && mouseY < this.y + this.alto;
  }
}
