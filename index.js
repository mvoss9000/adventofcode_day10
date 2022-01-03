const fs = require('fs')

const braces = {
    '(' : ')',
    '[' : ']',
    '{' : '}',
    '<' : '>',
}

const points1 = {
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137,
}

// use open braces for convenience to match the stack found
const points2 = {
    '(' : 1,
    '[' : 2,
    '{' : 3,
    '<' : 4,
}

function bad_brace (line) {
    let stack = []
    for (let i=0; i<line.length; i++) {
        let c = line[i]
        if (braces[c]) {
            stack.push(c)
        } else {
            let last = stack.pop()
            if (c !== braces[last]) {
                return c
            }
        }
    }
    return null
}

function remaining_braces (line) {
    let stack = []
    for (let i=0; i<line.length; i++) {
        let c = line[i]
        if (braces[c]) {
            stack.push(c)
        } else {
            let last = stack.pop()
            if (c !== braces[last]) {
                return null
            }
        }
    }
    return stack
}
function brace_points (stack) {
    let total = 0
    for (let i=stack.length-1; i >= 0; i--) {
        total = total * 5 + points2[stack[i]]
    }
    return total
}

function part_one () {
    let lines = fs.readFileSync('./data', 'utf8').split('\n')
    let bad_braces = lines.map((line) => bad_brace(line, false))
    console.log(bad_braces)
    let scores = bad_braces.map(c => points1[c] || 0)
    console.log(scores)
    let total = scores.reduce((a,b) => a+b, 0)
    console.log(total)
}

function part_two () {
    let lines = fs.readFileSync('./data', 'utf8').split('\n')
    let bad_braces = lines.map((line) => remaining_braces(line)).filter(s => s != null)
    console.log(bad_braces)
    let scores = bad_braces.map(stack => brace_points(stack)).sort((a,b) => b-a)
    console.log(scores)
    let median = scores[(scores.length - 1)/2]
    console.log(median)
}

if (require.main === module) {
    // part_one()
    part_two()
}
