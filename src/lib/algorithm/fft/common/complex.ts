

export type Complex = {
  real: number;
  imag: number
}

export function ComplexAdd(a: Complex, b: Complex): Complex {
  return {
    real: a.real + b.real,
    imag: a.imag + b.imag,
  }
}

export function ComplexDiv(a: Complex, d: number): Complex {
  return {
    real: a.real / d,
    imag: a.imag / d,
  }
}

export function ComplexMultiply(a: Complex, b: Complex): Complex {
  return {
    real: a.real * b.real - a.imag * b.imag,
    imag: a.real * b.imag + a.imag * b.real,
  }
}

export function ComplexGetPowSq(a: Complex): number {
  return a.real * a.real + a.imag * a.imag;
}

export function ComplexPolar(r: number, theta: number): Complex {
  return {
    real: r * Math.cos(theta),
    imag: r * Math.sin(theta)
  }
}

