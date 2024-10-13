//LoginProblem2
function getIndexsForPalindrome(text) {
    const esPalidromo = (s) => s === s.split('').reverse().join('')

    if (esPalidromo(text)) return []

    for (let a = 0; a < text.length - 1; a++) {
      for (let b = a + 1; b < text.length; b++) {

        const intercambiar = text.split('');
        [intercambiar[a], intercambiar[b]] = [intercambiar[b], intercambiar[a]]

        if (esPalidromo(intercambiar.join(''))) {
          return [a, b]
        }
      }
    }

    return null
  }

  console.log(getIndexsForPalindrome('anna')) // []
  console.log(getIndexsForPalindrome('abab')) // [0, 1]
  console.log(getIndexsForPalindrome('abac')) // null
  console.log(getIndexsForPalindrome('aaaaaaaa')) // []
  console.log(getIndexsForPalindrome('aaababa')) // [1, 3]
  console.log(getIndexsForPalindrome('caababa')) // null
  