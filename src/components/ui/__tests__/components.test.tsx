import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Button } from "../button";
import { Badge } from "../badge";
import { Pane } from "../pane";
import { Card, CardTitle } from "../card";
import { PromptHeading } from "../prompt";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../tabs";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../dialog";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "../menu";

describe("Button", () => {
  it("renders a native button with variant classes", () => {
    render(<Button variant="primary">deploy</Button>);
    const button = screen.getByRole("button", { name: "deploy" });
    expect(button.tagName).toBe("BUTTON");
    expect(button.className).toContain("bg-accent");
  });

  it("does not fire clicks when disabled", async () => {
    let clicks = 0;
    render(
      <Button disabled onClick={() => clicks++}>
        nope
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "nope" }));
    expect(clicks).toBe(0);
  });

  it("lets className override variant classes", () => {
    render(<Button className="h-20">tall</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("h-20");
    expect(cls).not.toContain("h-9");
  });
});

describe("Badge", () => {
  it("applies tone and variant", () => {
    render(
      <Badge tone="magenta" variant="outline">
        research
      </Badge>,
    );
    const badge = screen.getByText("research");
    expect(badge.className).toContain("text-ansi-magenta");
    expect(badge.className).toContain("border-ansi-magenta");
  });
});

describe("Pane", () => {
  it("is a region named by its title", () => {
    render(<Pane title="~/projects">body</Pane>);
    expect(screen.getByRole("region", { name: "~/projects" })).toHaveTextContent("body");
  });

  it("marks the focused pane with the accent border", () => {
    render(
      <Pane title="zsh" focused>
        x
      </Pane>,
    );
    const pane = screen.getByRole("region", { name: "zsh" });
    expect(pane).toHaveAttribute("data-focused");
    expect(pane.className).toContain("border-accent");
  });

  it("omits the title bar when there is no title or meta", () => {
    const { container } = render(<Pane>bare</Pane>);
    expect(container.querySelector("header")).toBeNull();
  });
});

describe("Card", () => {
  it("renders the requested element and title level", () => {
    render(
      <Card as="article">
        <CardTitle as="h2">gem5_pmo</CardTitle>
      </Card>,
    );
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "gem5_pmo" })).toBeInTheDocument();
  });
});

describe("PromptHeading", () => {
  it("exposes only the heading text to assistive tech", () => {
    render(
      <PromptHeading level={1} path="~/projects" cursor>
        projects
      </PromptHeading>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "projects" })).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("switches panels on click and marks the active tab", async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTab value="a" index={1}>
            overview
          </TabsTab>
          <TabsTab value="b" index={2}>
            results
          </TabsTab>
        </TabsList>
        <TabsPanel value="a">panel a</TabsPanel>
        <TabsPanel value="b">panel b</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: /overview/ })).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: /results/ }));
    expect(screen.getByRole("tab", { name: /results/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("panel b")).toBeVisible();
  });
});

describe("Dialog", () => {
  it("opens from its trigger with the title as its name, and closes with [x]", async () => {
    render(
      <Dialog>
        <DialogTrigger>open</DialogTrigger>
        <DialogContent title="new message">
          <DialogDescription>hello</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "open" }));
    const dialog = await screen.findByRole("dialog", { name: "new message" });
    expect(dialog).toHaveTextContent("hello");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

describe("Menu", () => {
  it("opens and runs an item", async () => {
    let picked = "";
    render(
      <Menu>
        <MenuTrigger>sort</MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => (picked = "date")}>date</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await userEvent.click(screen.getByRole("button", { name: "sort" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "date" }));
    expect(picked).toBe("date");
  });
});
