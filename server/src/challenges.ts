import type { Challenge } from "./types.js";

export const challenges: Challenge[] = [
  {
    id: "js-var-to-let",
    title: "var → let (nur require-Zeilen)",
    description:
      "Wandle alle „var“ zu „let“, aber nur in Zeilen, die „= require(“ enthalten.",
    startText: `var fs = require('fs')\nvar path = require('path')\nvar x = 1\nfunction demo(){\n  var y = require('y')\n  return x + y\n}`,
    targetText: `let fs = require('fs')\nlet path = require('path')\nvar x = 1\nfunction demo(){\n  let y = require('y')\n  return x + y\n}`,
    timeLimitSec: 90,
    penalties: { paste: 200 },
  },
  {
    id: "md-promote-headings",
    title: "Überschriften eine Stufe erhöhen",
    description: "Erhöhe alle H1 zu H2 innerhalb des Abschnitts „Intro“.",
    startText: `# Title\n\n## Intro\n# Aufgabe A\nText\n# Aufgabe B\nText\n\n## Outro\n# Ende`,
    targetText: `# Title\n\n## Intro\n## Aufgabe A\nText\n## Aufgabe B\nText\n\n## Outro\n# Ende`,
    timeLimitSec: 75,
    penalties: { paste: 200 },
  },
  {
    id: "nix-sort-inputs",
    title: "flake.nix inputs alphabetisch",
    description:
      "Sortiere die Inputs-Keys alphabetisch (nur die Zeilen mit Inputs).",
    startText: `{
  inputs = {
    nixpkgs-url.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    home-manager.url = "github:nix-community/home-manager";
  };
}`,
    targetText: `{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    home-manager.url = "github:nix-community/home-manager";
    nixpkgs-url.url = "github:NixOS/nixpkgs";
  };
}`,
    timeLimitSec: 60,
    penalties: { paste: 200 },
  },
];
