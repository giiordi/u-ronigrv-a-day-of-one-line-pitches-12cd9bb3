// A Day of One-Line Pitches — one sentence that would convince a friend
// who has never coded to let an AI agent build their first app idea on
// make.fun. Writes the pitch to $MAKEFUN_OUTPUT_DIR/entry.txt with no
// trailing newline. Node 22, stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Tell your AI agent the app idea you've been carrying around for months, and by tonight you'll be tapping through a real working version of it without writing a single line of code.";

// Gate: the sealed scorer accepts UTF-8 text of 1 to 240 characters, not
// only white space. The entry must also be exactly one sentence.
function validate(line: string): void {
  if (line.trim().length === 0) throw new Error("entry is blank");
  if (line.length < 1 || line.length > 240)
    throw new Error(`entry is ${line.length} chars, gate is 1..240`);
  if (line.includes("\n")) throw new Error("entry must be a single line");
  if ((line.match(/\./g) ?? []).length !== 1)
    throw new Error("entry must be exactly one sentence");
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
