import { describe, expect, it } from "vitest";
import { matchCommand } from "../command-palette";
import { shellPath } from "../site-map";

describe("matchCommand", () => {
  it("does not match scattered letters", () => {
    expect(matchCommand("cd ~/research", "cache")).toBe(0);
  });
  it("matches substrings and keywords", () => {
    expect(matchCommand("open cache simulator", "cache")).toBeGreaterThan(0);
    expect(matchCommand("theme", "light", ["light", "dark"])).toBeGreaterThan(0);
  });
  it("ranks a prefix match above an inner match, and both above a per-word match", () => {
    const prefix = matchCommand("cd ~/projects", "cd");
    const inner = matchCommand("open a cd player", "cd");
    const words = matchCommand("open gem5 pmo", "pmo gem5");
    expect(prefix).toBeGreaterThan(inner);
    expect(inner).toBeGreaterThan(words);
    expect(words).toBeGreaterThan(0);
  });
});

describe("shellPath", () => {
  it("prints home as ~", () => {
    expect(shellPath("/")).toBe("~");
    expect(shellPath("/projects")).toBe("~/projects");
  });
});
