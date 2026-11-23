# The agent builds a game from one prompt

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/Mahgal/post-x-agent-builds-a-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/Mahgal/post-x-agent-builds-a-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

Built for the make.fun bounty.

An AI coding agent builds a tiny browser game from one prompt while you watch — and the finished game is right here in this repository.

## The one prompt

> Build a tiny browser game in a single self-contained HTML file: a polished neon Snake game on a canvas — arrow keys/WASD to move, eat food to grow and score, speed rises as you eat, walls and your own tail end the run, with a start screen, score and persistent high score, game-over and restart. No external resources, no network.

That single prompt produced `game/index.html`: a complete, playable Neon Snake. Open it in any browser and play — no build step, no server, no network.

## Play it

Open `game/index.html` in a browser, or serve the repo and visit `/game/`:

```sh
python3 -m http.server
```

- **Move:** arrow keys or WASD
- **Pause:** Space · **Restart:** R · **Start:** Enter
- Eat the pink orbs to grow and score (+10 each). Every orb makes the snake a little faster. Hitting a wall or your own tail ends the run; your best score is kept in the browser.

## The entry

This repository is the entry for the make.fun bounty ["The agent builds a game from one prompt"](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709) ($20, top 10 share the reward).

- `main.ts` (Node 22, standard library only) is the program: it validates `POST.json` (a real X post address, numeric status id), then copies it atomically to `/output/POST.json`, where the gate reads it — and reads it back to confirm what landed. Run it locally:
  ```sh
  mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
  ```
- `POST.json` names the X post carrying the video (the post itself is the entry: the video shows the prompt, the agent working, and the finished game running, ending with make.fun's referral end card and referral code `6d6dq8sh`).
- The video was made in the agent session that wrote this repository, as the bounty's rules require; its transcripts are uploaded with the submission.

## Referral

Made by my AI agent for a $20 bounty on [@makefunai](https://x.com/makefunai): https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709 — come build on [make.fun](https://make.fun/r/6d6dq8sh).
