import compact from 'lodash/compact'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import range from 'lodash/range'

const getRandomAscii = (range, displacement) =>
  String.fromCharCode(Math.floor(Math.random() * range) + displacement)

const getRandomLower = () => getRandomAscii(26, 97)

const getRandomUpper = () => getRandomAscii(26, 65)

const getRandomNumber = () => getRandomAscii(10, 48)

const getRandomSymbol = (symbols = '!@#$%^&*(){}[]=<>/,.') =>
  symbols[Math.floor(Math.random() * symbols.length)]

const getRandomOrRetry = (fn, exclude = []) => {
  if (isEmpty(exclude)) return fn

  return () => {
    const randomValue = fn()
    return exclude.includes(randomValue)
      ? getRandomOrRetry(fn, exclude)()
      : randomValue
  }
}

const getRandomGenerator = (
  type,
  excludeNumbers = ['0', '1'],
  excludeUpper = ['O'],
  excludeLower = ['l']
) =>
  ({
    containsLower: getRandomOrRetry(getRandomLower, excludeLower),
    containsNumbers: getRandomOrRetry(getRandomNumber, excludeNumbers),
    containsUpper: getRandomOrRetry(getRandomUpper, excludeUpper),
    containsSymbols: getRandomSymbol,
  }[type])

const generatePassword = ({
  containsLower = true,
  containsUpper = false,
  containsNumbers = false,
  containsSymbols = false,
  length,
}) => {
  const types = {
    containsLower,
    containsNumbers,
    containsSymbols,
    containsUpper,
  }

  const allowed = compact(map(types, (value, type) => (value ? type : null)))

  return allowed.length < 1
    ? ''
    : map(range(length), () => {
        const randomGenerator = getRandomGenerator(
          allowed[Math.floor(Math.random() * allowed.length)]
        )
        return randomGenerator()
      }).join('')
}

export default generatePassword
