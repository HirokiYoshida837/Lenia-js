export class Complex {


  constructor(public real: number, public imag: number) {
  }

  multiply(complex: Complex) {

    const r = this.real * complex.real - this.imag * complex.imag;
    const i = this.real * complex.imag + this.imag * complex.real;

    return new Complex(r, i);
  }

  add(complex: Complex){
    return new Complex(this.real+complex.real, this.imag+complex.imag);
  }

  getPowSq() {
    return this.real * this.real + this.imag * this.imag;
  }

  static polar(r: number, theta: number) {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta))
  }

  div(d: number) {
    return new Complex(this.real / d, this.imag / d)
  }
}
