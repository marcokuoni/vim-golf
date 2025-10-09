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
];
