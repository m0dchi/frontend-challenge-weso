//LogicProblem1
function decode(message) {
    const regex = new RegExp(/\(([^()]+)\)/, 'g')
    const replacer = (_, group) => group.split('').reverse().join('')
  
    while (regex.test(message)) {
      message = message.replace(regex, replacer)
    }
  
    return message
  }

  const a = decode("hola (odnum)")
  console.log(a) // hola mundo
  
  const b = decode("(olleh) (dlrow)!")
  console.log(b) // hello world!
  
  const c = decode("sa(u(cla)atn)s")
  console.log(c) // santaclaus
  