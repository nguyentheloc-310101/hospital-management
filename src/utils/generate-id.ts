const generatedIds = new Set<string>();

export function generateId() {
  const maxAttempts = 50;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const arr = new Uint8Array(25 / 2);
    window.crypto.getRandomValues(arr);
    const newId = Array.from(arr, dec2num).join('');

    if (!generatedIds.has(newId)) {
      generatedIds.add(newId);
      const newIdFormat = getRandomPatternNumber(newId);
      return newIdFormat;
    }

    attempts++;
  }

  return errCreateOrderId();
}

function dec2num(dec: number): string {
  return String(dec % 10);
}

const patterns: string[] = [
  'xxx-xxx-xxx-xxx',

  'xx-xxxx-xxx-xxx',
  'xx-xxx-xxxx-xxx',
  'xx-xxx-xxx-xxxx',

  'xxx-xxx-xxx-xxx',

  'xxxx-xx-xxx-xxx',
  'xxx-xx-xxxx-xxx',
  'xxx-xx-xxx-xxxx',

  'xxx-xxx-xxx-xxx',

  'xxxx-xxx-xx-xxx',
  'xxx-xxxx-xx-xxx',
  'xxx-xxx-xx-xxxx',

  'xxx-xxx-xxx-xxx',

  'xxxx-xxx-xxx-xx',
  'xxx-xxxx-xxx-xx',
  'xxx-xxx-xxxx-xx',

  'xxx-xxx-xxx-xxx',

  'xx-xx-xxxx-xxxx',
  'xx-xxxx-xx-xxxx',
  'xx-xxxx-xxxx-xx',

  'xxx-xxx-xxx-xxx',

  'xxxx-xx-xxxx-xx',
  'xxxx-xxxx-xx-xx',

  'xxx-xxx-xxx-xxx',

  'xx-xx-xx-xxxxxx',
  'xx-xx-xxxxxx-xx',

  'xxx-xxx-xxx-xxx',

  'xx-xxxxxx-xx-xx',
  'xxxxxx-xx-xx-xx',

  'xxx-xxx-xxx-xxx',
];

function randomizePatternNumber(numberTr: string, pattern: string) {
  let index = 0;
  return pattern.replace(/x/g, () => numberTr[index++]);
}

function getRandomPatternNumber(numberTr: string) {
  const randomIndex = Math.floor(Math.random() * patterns.length);
  const selectedPattern = patterns[randomIndex];
  return randomizePatternNumber(numberTr, selectedPattern);
}

const errCreateOrderId = () => {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const newResult =
    result.slice(0, 3) +
    '-' +
    result.slice(3, 6) +
    '-' +
    result.slice(6, 9) +
    '-' +
    result.slice(9, 12);
  return newResult;
};