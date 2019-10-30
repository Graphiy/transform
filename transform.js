export function transform (el, _x, _y, _scale, ...args) {
  let matrixString = getComputedStyle(el).transform
  if (matrixString === 'none') matrixString = 'matrix(1,0,0,1,0,0)'
  let matrix = matrixString.slice(7, -1).split(',')
  const x = _.isNumber(_x) ? _x : _.toNumber(matrix[4])
  const y = _.isNumber(_y) ? _y : _.toNumber(matrix[5])
  const __scale = _scale || _.toNumber(matrix[0])
  matrix = [__scale, 0, 0, __scale, x, y]

  if (arguments.length === 1) return matrix
  return el.style.transform = `matrix(${matrix.join(',')})`
}

export function translateX (el, x) {
  const matrix = transform(el)
  const newX = _.isNumber(x) ? x : matrix[4]
  const newY = matrix[5]
  const newScale = matrix[0]
  if (x === undefined) return newX
  return transform(el, newX, newY, newScale)
}

export function translateY (el, y) {
  const matrix = transform(el)
  const newX = matrix[4]
  const newY = _.isNumber(y) ? y : matrix[5]
  const newScale = matrix[0]
  if (y === undefined) return newY
  return transform(el, newX, newY, newScale)
}

export function translate (el, x, y) {
  const matrix = transform(el)
  const newX = _.isNumber(x) ? x : matrix[4]
  const newY = _.isNumber(y) ? y : matrix[5]
  const newScale = matrix[0]
  if (x === undefined && y === undefined) return [newX, newY]
  return transform(el, newX, newY, newScale)
}

export function scale (el, _scale) {
  const matrix = transform(el)
  const newX = matrix[4]
  const newY = matrix[5]
  const newScale = _scale || matrix[0]
  if (_scale === undefined) return newScale
  return transform(el, newX, newY, newScale)
}

  // TODO
export function rotateDegrees (el, degree) {
  const matrix = transform(el)
  let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  if (degree === undefined) return (angle < 0) ? angle + 360 : angle
  return transform(el, matrix)
}
