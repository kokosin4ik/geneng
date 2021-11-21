
// TODO узнать что подразумевается и почему такие переводы
const complementMap = {
    A: 'T',
    T: 'A',
    G: 'C',
    C: 'G',
    U: 'A',
}// может это reverseComplement?
export const invert = (sequence: string) => {
    return sequence
        .split('')
        .reverse()
        // @ts-ignore
        .map(nucleo => complementMap[nucleo])
        .join('');
}