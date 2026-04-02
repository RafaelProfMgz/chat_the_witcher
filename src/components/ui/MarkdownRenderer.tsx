"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// ─── Inline Parsing ──────────────────────────────────────────────────────────

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    // --- Link: [text](url) ---
    const linkMatch = remaining.match(/^\[([^\]]*)\]\(([^)]*)\)/);
    if (linkMatch) {
      nodes.push(
        <a
          key={`${keyPrefix}-link-${idx}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-witcher-gold underline decoration-witcher-gold/40 underline-offset-2 transition-colors hover:text-witcher-gold-light hover:decoration-witcher-gold/70"
        >
          {linkMatch[1]}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      idx++;
      continue;
    }

    // --- Inline code: `code` ---
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      nodes.push(
        <code
          key={`${keyPrefix}-ic-${idx}`}
          className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-witcher-gold-light/90"
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      idx++;
      continue;
    }

    // --- Bold: **text** ---
    const boldMatch = remaining.match(/^\*\*([\s\S]+?)\*\*/);
    if (boldMatch) {
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${idx}`}
          className="font-semibold text-witcher-gold-light"
        >
          {parseInline(boldMatch[1], `${keyPrefix}-b-${idx}`)}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      idx++;
      continue;
    }

    // --- Italic: *text* (single asterisk, not followed by another *) ---
    const italicMatch = remaining.match(/^\*([^*]+?)\*/);
    if (italicMatch) {
      nodes.push(
        <em key={`${keyPrefix}-i-${idx}`} className="italic text-gray-100/95">
          {parseInline(italicMatch[1], `${keyPrefix}-i-${idx}`)}
        </em>,
      );
      remaining = remaining.slice(italicMatch[0].length);
      idx++;
      continue;
    }

    // --- Plain character ---
    // Accumulate plain text until the next special character
    const nextSpecial = remaining.slice(1).search(/[\[`*]/);
    const endIdx = nextSpecial === -1 ? remaining.length : nextSpecial + 1;
    nodes.push(
      <React.Fragment key={`${keyPrefix}-t-${idx}`}>
        {remaining.slice(0, endIdx)}
      </React.Fragment>,
    );
    remaining = remaining.slice(endIdx);
    idx++;
  }

  return nodes;
}

// ─── Block Parsing ───────────────────────────────────────────────────────────

interface CodeBlock {
  type: "code";
  language: string;
  content: string;
}

interface TextBlock {
  type: "text";
  content: string;
}

type Block = CodeBlock | TextBlock;

function splitCodeBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Text before this code block
    if (match.index > lastIndex) {
      blocks.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    blocks.push({
      type: "code",
      language: match[1] || "",
      content: match[2].replace(/\n$/, ""), // trim trailing newline inside fence
    });
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last code block
  if (lastIndex < content.length) {
    blocks.push({ type: "text", content: content.slice(lastIndex) });
  }

  return blocks;
}

function renderCodeBlock(block: CodeBlock, key: string): React.ReactNode {
  return (
    <div key={key} className="my-3">
      {block.language && (
        <div className="rounded-t-lg border border-b-0 border-white/[0.08] bg-white/[0.05] px-3 py-1">
          <span className="font-mono text-xs text-witcher-gold/70">
            {block.language}
          </span>
        </div>
      )}
      <pre
        className={`overflow-x-auto rounded-lg border border-white/[0.08] bg-[rgba(255,255,255,0.03)] p-4 ${
          block.language ? "rounded-t-none border-t-0" : ""
        }`}
      >
        <code className="font-mono text-[0.85em] leading-relaxed text-gray-200/90">
          {block.content}
        </code>
      </pre>
    </div>
  );
}

function renderTextBlock(text: string, blockKey: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on double-newline for paragraphs, but we also handle single-newlines within paragraphs
  const lines = text.split("\n");

  let i = 0;
  let lineKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // --- Empty line → paragraph break ---
    if (trimmed === "") {
      // Only push a spacer if we already have content
      if (nodes.length > 0) {
        nodes.push(<div key={`${blockKey}-pb-${lineKey++}`} className="h-2" />);
      }
      i++;
      continue;
    }

    // --- Horizontal rule: --- or *** or ___ (3+ chars) ---
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      nodes.push(
        <hr
          key={`${blockKey}-hr-${lineKey++}`}
          className="my-3 border-0 border-t border-witcher-gold/30"
        />,
      );
      i++;
      continue;
    }

    // --- Headings ---
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const Tag = `h${level + 1}` as "h2" | "h3" | "h4";
      const sizeClass =
        level === 1
          ? "text-lg font-bold mt-4 mb-2"
          : level === 2
            ? "text-base font-bold mt-3 mb-1.5"
            : "text-sm font-semibold mt-2 mb-1";

      nodes.push(
        React.createElement(
          Tag,
          {
            key: `${blockKey}-h-${lineKey++}`,
            className: `${sizeClass} text-witcher-gold`,
            style: { fontFamily: "var(--font-cinzel, serif)" },
          },
          parseInline(headingText, `${blockKey}-h-${lineKey}`),
        ),
      );
      i++;
      continue;
    }

    // --- Unordered list: - item or * item ---
    if (/^[-*]\s+/.test(trimmed)) {
      const items: React.ReactNode[] = [];
      let li = 0;
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-*]\s+/, "");
        items.push(
          <li
            key={`${blockKey}-uli-${lineKey}-${li}`}
            className="flex items-start gap-2"
          >
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-witcher-gold/70" />
            <span>
              {parseInline(itemText, `${blockKey}-uli-${lineKey}-${li}`)}
            </span>
          </li>,
        );
        li++;
        i++;
      }
      nodes.push(
        <ul
          key={`${blockKey}-ul-${lineKey++}`}
          className="my-1.5 flex list-none flex-col gap-1 pl-1"
          role="list"
        >
          {items}
        </ul>,
      );
      continue;
    }

    // --- Ordered list: 1. item ---
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: React.ReactNode[] = [];
      let li = 0;
      let num = 1;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, "");
        items.push(
          <li
            key={`${blockKey}-oli-${lineKey}-${li}`}
            className="flex items-start gap-2"
          >
            <span className="mt-[0.05em] shrink-0 font-semibold text-witcher-gold/80">
              {num}.
            </span>
            <span>
              {parseInline(itemText, `${blockKey}-oli-${lineKey}-${li}`)}
            </span>
          </li>,
        );
        li++;
        num++;
        i++;
      }
      nodes.push(
        <ol
          key={`${blockKey}-ol-${lineKey++}`}
          className="my-1.5 flex list-none flex-col gap-1 pl-1"
          role="list"
        >
          {items}
        </ol>,
      );
      continue;
    }

    // --- Regular line (paragraph text) ---
    // Accumulate consecutive non-special lines into one paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}\s|[-*]\s+|\d+\.\s+|(-{3,}|\*{3,}|_{3,})$)/.test(
        lines[i].trim(),
      )
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const paraContent: React.ReactNode[] = [];
      paraLines.forEach((pLine, pIdx) => {
        if (pIdx > 0) {
          paraContent.push(<br key={`${blockKey}-br-${lineKey}-${pIdx}`} />);
        }
        paraContent.push(
          ...parseInline(pLine, `${blockKey}-p-${lineKey}-${pIdx}`),
        );
      });
      nodes.push(
        <p key={`${blockKey}-p-${lineKey++}`} className="my-0">
          {paraContent}
        </p>,
      );
    }
  }

  return nodes;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  if (!content) {
    return <div className={className} />;
  }

  let rendered: React.ReactNode[];

  try {
    const blocks = splitCodeBlocks(content);
    rendered = [];

    blocks.forEach((block, blockIdx) => {
      if (block.type === "code") {
        rendered.push(renderCodeBlock(block as CodeBlock, `cb-${blockIdx}`));
      } else {
        rendered.push(...renderTextBlock(block.content, `tb-${blockIdx}`));
      }
    });
  } catch {
    // Graceful degradation: render as plain text
    rendered = [<p key="fallback">{content}</p>];
  }

  return (
    <div className={`markdown-content ${className ?? ""}`}>{rendered}</div>
  );
}
