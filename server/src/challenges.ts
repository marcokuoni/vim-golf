import type { Challenge } from "./types.js";

export const challenges: Challenge[] = [
  {
    id: "textobjekte-rocken",
    title: "Textobjekte rocken",
    description: '«ci"», «daw» & Co.: Textobjekte rocken',
    startText: `const msg = "hello world";
function area(w, h) { return (w * h) + (w + h); }
const path = '/var/www/app';`,
    targetText: `const msg = "Hi Vim";
function area(w, h) { return (w * h); }
const path = '/var/www';`,
    timeLimitSec: 90,
    penalties: { paste: 200 },
  },
  {
    id: "kombinieren",
    title: "Kombinieren",
    description: "Bewegungen + Operatoren kombinieren",
    startText: `# Title

## Intro
# Aufgabe A
Text
# Aufgabe B
Text

## Outro
# Ende`,
    targetText: `# Title

## Intro
## Aufgabe A
Text
## Aufgabe B
Text

## Outro
# Ende`,
    timeLimitSec: 75,
    penalties: { paste: 200 },
  },
  {
    id: "blockmodus",
    title: "blockmodus",
    description: "Visueller Blockmodus zum Spalten-Editieren",
    startText: `item one
item two
item three`,
    targetText: `// TODO: item one
// TODO: item two
// TODO: item three`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
  {
    id: "suchen-ersetzen",
    title: "Suchen & Ersetzen",
    description: "Suchen & Ersetzen mit «%s» und «\\v»",
    startText: `const user = { user_id: 1, is_active: false };
console.log(user.user_id, user.is_active);`,
    targetText: `const user = { userId: 1, isActive: false };
console.log(user.userId, user.isActive);`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
  {
    id: "makros",
    title: "Makros",
    description: "Makros aufnehmen und abspielen",
    startText: `apple
banana
cherry`,
    targetText: `apple, fruit
banana, fruit
cherry, fruit`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
  {
    id: "wiederholen",
    title: "Wiederholen",
    description: "Bewegungen/Aktionen n mal wiederholen",
    startText: `const twoRowsNineColumns = [
  [],
  []
];`,
    targetText: `const twoRowsNineColumns = [
  [[1],[1],[1],[1],[1],[1],[1],[1],[1],],
  [["two"],["two"],["two"],["two"],["two"],["two"],["two"],["two"],["two"],]
];`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  }, 
  {
    id: "formatieren",
    title: "Formatieren",
    description: "Code schön ausrichten",
    startText: `  const amIPrettyYet = {
eyes = "purple",
  height = 164;
};

       function hello() {
console.log("Hello world!");
                                          console.log("Hello from far away...");
}

    hello();`,
    targetText: `const amIPrettyYet = {
  eyes = "purple",
  height = 164,
};

function hello() {
  console.log("Hello world!");
  console.log("Hello from far away...");
}

hello();`,
    timeLimitSec: 60,
  }, 
  {
    id: "zusammenfügen",
    title: "Zeilen zusammenfügen",
    description: "Come together, Right now, Over me",
    startText: `const friends = [

  "John Lennon",

  "Paul McCartney",

  "George Harrison",

  "Ringo Starr"

];`,
    targetText: `const friends = [ "John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr" ];`,
    timeLimitSec: 60,
  }, 
  {
    id: "vervollständigung",
    title: "Vervollständigung",
    description: "Falls man mal zu faul ist, um zu tippen - ACHTUNG: Es könnten nicht alle Bindings funktionieren",
    startText: `const complete = {
  veryVeryLongKeyThatShouldHaveBeenShorter: "9 + 10",
  anotherEvenLongerKeyThatShouldHaveBeenShorter: 21,
};

console.log("What's " + complete. + "?");
console.log(complete.);`,
    targetText: `const complete = {
  veryVeryLongKeyThatShouldHaveBeenShorter: "9 + 10",
  anotherEvenLongerKeyThatShouldHaveBeenShorter: 21,
};

console.log("What's " + complete.veryVeryLongKeyThatShouldHaveBeenShorter + "?");
console.log(complete.anotherEvenLongerKeyThatShouldHaveBeenShorter);`,
    timeLimitSec: 60,
  }, 
  {
    id: "auf-ab-zaehlen",
    title: "Auf- und Abzählen",
    description: "Zahlen, Zahlen, Zahlen - ACHTUNG: Es könnten nicht alle Bindings funktionieren",
    startText: `8 3 2 9 0 6`,
    targetText: `7 4 2 6 2 5 `,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
  {
    id: "aufnummerieren-blockmodus",
    title: "Aufnummerieren im Blockmodus",
    description: "Mehrere Zahlen Reihenweise aufzählen - ACHTUNG: Es könnten nicht alle Bindings funktionieren",
    startText: `0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0`,
    targetText: `1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
];
