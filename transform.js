$.fn.translateX = function (x) {
  const matrix = this.transform()
  const newX = _.isNumber(x) ? x : matrix[4]
  const newY = matrix[5]
  const newScale = matrix[0]
  if (x === undefined) return newX
  return this.transform(newX, newY, newScale)
}

$.fn.translateY = function (y) {
  const matrix = this.transform()
  const newX = matrix[4]
  const newY = _.isNumber(y) ? y : matrix[5]
  const newScale = matrix[0]
  if (y === undefined) return newY
  return this.transform(newX, newY, newScale)
}

$.fn.translate = function (x, y) {
  const matrix = this.transform()
  const newX = _.isNumber(x) ? x : matrix[4]
  const newY = _.isNumber(y) ? y : matrix[5]
  const newScale = matrix[0]
  if (y === undefined && y === undefined) return [newX, newY]
  return this.transform(newX, newY, newScale)
}

$.fn.scale = function (scale) {
  const matrix = this.transform()
  const newX = matrix[4]
  const newY = matrix[5]
  const newScale = scale || matrix[0]
  if (scale === undefined) return newScale
  return this.transform(newX, newY, newScale)
}

$.fn.transform = function (_x, _y, _scale, ...args) {
  let transform = this.css('transform')
  if (transform === 'none') transform = 'matrix(1,0,0,1,0,0)'
  let matrix = transform.slice(7, -1).split(',')
  const x = _.isNumber(_x) ? _x : _.toNumber(matrix[4])
  const y = _.isNumber(_y) ? _y : _.toNumber(matrix[5])
  const scale = _scale || _.toNumber(matrix[0])
  matrix = [scale, 0, 0, scale, x, y]

  if (_.isEmpty(arguments)) return matrix

  return this.css('transform', `matrix(${matrix.join(',')})`)
}

$.fn.rotationDegrees = function () {
  const matrix = this.css('transform')
  let angle

  if (typeof matrix === 'string' && matrix !== 'none') {
    const values = matrix.split('(')[1].split(')')[0].split(',')
    const a = values[0]
    const b = values[1]
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  } else { angle = 0 }
  return (angle < 0) ? angle + 360 : angle
}
