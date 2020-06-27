import compact from 'lodash/compact'
import map from 'lodash/map'
import range from 'lodash/range'

const getRandomAscii = (range, displacement) =>
  String.fromCharCode(Math.floor(Math.random() * range) + displacement)

const getRandomLower = () => getRandomAscii(26, 97)

const getRandomUpper = () => getRandomAscii(26, 65)

const getRandomNumber = () => getRandomAscii(10, 48)

function getRandomSymbol(symbols = '!@#$%^&*(){}[]=<>/,.') {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const getRandomGenerator = (type) =>
  ({
    containsLower: getRandomLower,
    containsNumbers: getRandomNumber,
    containsUpper: getRandomUpper,
    containsSymbols: getRandomSymbol,
  }[type])

const generatePassword = ({
  containsLower=true,
  containsUpper=false,
  containsNumbers=false,
  containsSymbols=false,
  length,
}) => {
  const types = {
    containsLower,
    containsNumbers,
    containsSymbols,
    containsUpper,
  }

  const allowed = compact(map(types, (value, type) => (value ? type : null)))

  if (allowed.length < 1) return ''

  return map(range(length), () => {
    const randomGenerator = getRandomGenerator(
      allowed[Math.floor(Math.random() * allowed.length)]
    )
    return randomGenerator()
  }).join('')
}

export default generatePassword
