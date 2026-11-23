// main.ts — the program for "The agent builds a game from one prompt"
// (Node 22, standard library only).
//
// The entry is the post itself: your agent makes a short video about an AI
// coding agent building a tiny browser game from one prompt while you watch,
// posts it natively on X from a public account with make.fun or @makefunai
// and your play code in the post's text, and ends the video with make.fun's
// referral end card and your referral code. This program only hands the
// house the post's address: it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. Nothing this program writes
// about the post is scored.
//
// Before handing it over, the program validates POST.json: it must parse as
// JSON, carry a url that is an X post address for this entry, and name a
// numeric status id. A bad or placeholder link fails loudly instead of
// reaching the gate. The copy is written atomically (temp file plus rename)
// so a crash can never leave a half-written POST.json.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function fail(message: string): never {
  console.error(`POST.json rejected: ${message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

let raw: string;
try {
  raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
} catch (err) {
  fail(`could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  fail(`is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('must be a JSON object with a url field');
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string') {
  fail('url must be a string');
}
// X post addresses the gate reads: x.com or twitter.com, optional www./mobile.,
// /<handle>/status/<digits> or /i/web/status/<digits>; a query or fragment is read past.
const match = /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:i\/web\/status\/(\d+)|[A-Za-z0-9_]+\/status\/(\d+))(?:[?#].*)?$/.exec(url);
if (!match) {
  fail(`url is not an X post address: ${url}`);
}
const statusId = match[1] ?? match[2];
if (!/^\d+$/.test(statusId)) {
  fail(`status id is not numeric: ${statusId}`);
}

// Atomic write: temp file in the same directory, then rename over.
const dest = join(OUTPUT_DIR, 'POST.json');
const tmp = `${dest}.tmp-${process.pid}`;
try {
  writeFileSync(tmp, JSON.stringify(parsed), 'utf8');
  renameSync(tmp, dest);
} catch (err) {
  fail(`could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

// Read-back verification: confirm what landed is the post we validated,
// so a silent or partial write can never hand the gate a wrong file.
let written: unknown;
try {
  written = JSON.parse(readFileSync(dest, 'utf8'));
} catch (err) {
  fail(`written file could not be read back: ${(err as Error).message}`);
}
if (
  typeof written !== 'object' || written === null ||
  (written as { url?: unknown }).url !== url
) {
  fail('written file does not match the validated POST.json');
}
console.log(`POST.json validated (${url}) and written to ${dest}`);
