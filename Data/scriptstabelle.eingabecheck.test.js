const sum = requirre('C:\Users\ivosa\OneDrive\Documents\simplexverfahren\Website\Data\tablescripts')

test ('nimmt beliebige Zahl wie gewünscht entgegen', () => {
    expect(inputCheck(878)).toBe(true)
})

test ('nimmt keine Zeichen entgegen', () => {
    expect(inputCheck('+')).toBe(false)
})

test ('nimmt Kommazahl entgegen', () => {
    expect(inputCheck(6,8)).toBe(true)
})

test ('nimmt durch Punkt getrennte Kommazahl entgegen', () => {
    expect(inputCheck(6.8)).toBe(true)
})

test ('nimmt keine Buchstaben entgegen', () => {
    expect(inputCheck('j')).toBe(false)
})

test ('nimmt nicht mehrere Zahlen auf einmal entgegen', () => {
    expect(inputCheck(6,8,9)).toBe(false)
})

test ('nimmt negative Zahlen entgegen', () => {
    expect(inputCheck(-8)).toBe(true)
})