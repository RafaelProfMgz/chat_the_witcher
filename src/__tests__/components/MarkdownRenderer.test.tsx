import React from "react";
import { render, screen } from "@testing-library/react";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

describe("MarkdownRenderer", () => {
  // ── 1. Plain text ────────────────────────────────────────────────────────
  it("renders plain text correctly", () => {
    render(<MarkdownRenderer content="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  // ── 2. Bold ──────────────────────────────────────────────────────────────
  it("renders **bold** as <strong> elements", () => {
    const { container } = render(
      <MarkdownRenderer content="Use the **Igni** sign" />,
    );
    const strong = container.querySelector("strong");
    expect(strong).toBeInTheDocument();
    expect(strong!.textContent).toBe("Igni");
    expect(strong).toHaveClass("text-witcher-gold-light");
  });

  // ── 3. Italic ────────────────────────────────────────────────────────────
  it("renders *italic* as <em> elements", () => {
    const { container } = render(
      <MarkdownRenderer content="The *White Wolf* arrives" />,
    );
    const em = container.querySelector("em");
    expect(em).toBeInTheDocument();
    expect(em!.textContent).toBe("White Wolf");
  });

  // ── 4. Inline code ──────────────────────────────────────────────────────
  it("renders `inline code` with code element", () => {
    const { container } = render(
      <MarkdownRenderer content="Run `npm install` first" />,
    );
    const code = container.querySelector("code");
    expect(code).toBeInTheDocument();
    expect(code!.textContent).toBe("npm install");
    expect(code).toHaveClass("font-mono");
  });

  // ── 5. Code blocks ─────────────────────────────────────────────────────
  it("renders code blocks with pre/code elements", () => {
    const content = "```javascript\nconsole.log('hello');\n```";
    const { container } = render(<MarkdownRenderer content={content} />);
    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
    const code = pre!.querySelector("code");
    expect(code).toBeInTheDocument();
    expect(code!.textContent).toBe("console.log('hello');");
  });

  it("renders code block language label when provided", () => {
    const content = "```typescript\nconst x = 1;\n```";
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(screen.getByText("typescript")).toBeInTheDocument();
    // Verify pre still exists
    expect(container.querySelector("pre")).toBeInTheDocument();
  });

  // ── 6. Unordered lists ─────────────────────────────────────────────────
  it("renders unordered lists (- items)", () => {
    const content = "- Sword\n- Shield\n- Potion";
    const { container } = render(<MarkdownRenderer content={content} />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const items = ul!.querySelectorAll("li");
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toBe("Sword");
    expect(items[1].textContent).toBe("Shield");
    expect(items[2].textContent).toBe("Potion");
  });

  it("renders unordered lists with * marker", () => {
    const content = "* Alpha\n* Beta";
    const { container } = render(<MarkdownRenderer content={content} />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const items = ul!.querySelectorAll("li");
    expect(items).toHaveLength(2);
  });

  // ── 7. Ordered lists ───────────────────────────────────────────────────
  it("renders ordered lists (1. items)", () => {
    const content = "1. First\n2. Second\n3. Third";
    const { container } = render(<MarkdownRenderer content={content} />);
    const ol = container.querySelector("ol");
    expect(ol).toBeInTheDocument();
    const items = ol!.querySelectorAll("li");
    expect(items).toHaveLength(3);
    // Check the text portion of items
    expect(items[0].textContent).toContain("First");
    expect(items[1].textContent).toContain("Second");
    expect(items[2].textContent).toContain("Third");
  });

  // ── 8. Headings ────────────────────────────────────────────────────────
  it("renders # heading as <h2>", () => {
    const { container } = render(<MarkdownRenderer content="# Main Title" />);
    const h2 = container.querySelector("h2");
    expect(h2).toBeInTheDocument();
    expect(h2!.textContent).toBe("Main Title");
    expect(h2).toHaveClass("text-witcher-gold");
  });

  it("renders ## heading as <h3>", () => {
    const { container } = render(<MarkdownRenderer content="## Subtitle" />);
    const h3 = container.querySelector("h3");
    expect(h3).toBeInTheDocument();
    expect(h3!.textContent).toBe("Subtitle");
  });

  it("renders ### heading as <h4>", () => {
    const { container } = render(
      <MarkdownRenderer content="### Minor Section" />,
    );
    const h4 = container.querySelector("h4");
    expect(h4).toBeInTheDocument();
    expect(h4!.textContent).toBe("Minor Section");
  });

  // ── 9. Horizontal rules ────────────────────────────────────────────────
  it("renders --- as a horizontal rule", () => {
    const content = "Above\n\n---\n\nBelow";
    const { container } = render(<MarkdownRenderer content={content} />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("renders *** as a horizontal rule", () => {
    const content = "Top\n\n***\n\nBottom";
    const { container } = render(<MarkdownRenderer content={content} />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  // ── 10. Links ──────────────────────────────────────────────────────────
  it("renders [text](url) as anchor with href", () => {
    const { container } = render(
      <MarkdownRenderer content="Visit [Kaer Morhen](https://example.com)" />,
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link!.textContent).toBe("Kaer Morhen");
    expect(link!.getAttribute("href")).toBe("https://example.com");
    expect(link!.getAttribute("target")).toBe("_blank");
    expect(link!.getAttribute("rel")).toContain("noopener");
  });

  // ── 11. Mixed formatting ───────────────────────────────────────────────
  it("handles bold inside a list item", () => {
    const content = "- Use **Igni** sign\n- Cast **Quen** shield";
    const { container } = render(<MarkdownRenderer content={content} />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const strongs = ul!.querySelectorAll("strong");
    expect(strongs).toHaveLength(2);
    expect(strongs[0].textContent).toBe("Igni");
    expect(strongs[1].textContent).toBe("Quen");
  });

  it("handles inline code mixed with bold", () => {
    const { container } = render(
      <MarkdownRenderer content="Run `cmd` then **profit**" />,
    );
    expect(container.querySelector("code")).toBeInTheDocument();
    expect(container.querySelector("strong")).toBeInTheDocument();
  });

  // ── 12. Malformed markdown ─────────────────────────────────────────────
  it("doesn't break on unclosed ** bold markers", () => {
    const { container } = render(
      <MarkdownRenderer content="This is **unclosed bold text" />,
    );
    // Should still render something without throwing
    expect(container.textContent).toContain("This is **unclosed bold text");
  });

  it("doesn't break on unclosed * italic markers", () => {
    const { container } = render(
      <MarkdownRenderer content="This is *unclosed italic" />,
    );
    expect(container.textContent).toContain("This is *unclosed italic");
  });

  it("doesn't break on unclosed inline code", () => {
    const { container } = render(
      <MarkdownRenderer content="Check this `unclosed code" />,
    );
    expect(container.textContent).toContain("Check this `unclosed code");
  });

  // ── 13. Empty content ─────────────────────────────────────────────────
  it("handles empty content", () => {
    const { container } = render(<MarkdownRenderer content="" />);
    expect(container.firstChild).toBeInTheDocument();
    // The container div should exist but essentially be empty
    expect(container.textContent).toBe("");
  });

  it("handles whitespace-only content", () => {
    const { container } = render(<MarkdownRenderer content="   " />);
    expect(container).toBeInTheDocument();
  });

  // ── Additional edge cases ──────────────────────────────────────────────
  it("applies custom className", () => {
    const { container } = render(
      <MarkdownRenderer content="test" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles multiple paragraphs separated by double newlines", () => {
    const content = "First paragraph\n\nSecond paragraph";
    const { container } = render(<MarkdownRenderer content={content} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(paragraphs[0].textContent).toBe("First paragraph");
    expect(paragraphs[1].textContent).toBe("Second paragraph");
  });

  it("renders single newlines as <br> within paragraphs", () => {
    const content = "Line one\nLine two";
    const { container } = render(<MarkdownRenderer content={content} />);
    const br = container.querySelector("br");
    expect(br).toBeInTheDocument();
  });

  it("handles code blocks with text before and after", () => {
    const content = "Before\n\n```js\nconst x = 1;\n```\n\nAfter";
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(container.textContent).toContain("Before");
    expect(container.textContent).toContain("const x = 1;");
    expect(container.textContent).toContain("After");
    expect(container.querySelector("pre")).toBeInTheDocument();
  });
});
