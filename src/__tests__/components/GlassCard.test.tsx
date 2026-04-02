import React from "react";
import { render, screen } from "@testing-library/react";
import GlassCard from "@/components/ui/GlassCard";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      whileInView,
      variants,
      layout,
      layoutId,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

describe("GlassCard", () => {
  it("renders children correctly", () => {
    render(<GlassCard>Hello World</GlassCard>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies default glass class when no variant is specified", () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.firstChild).toHaveClass("glass");
  });

  it('applies "glass" class for variant="default"', () => {
    const { container } = render(<GlassCard variant="default">A</GlassCard>);
    expect(container.firstChild).toHaveClass("glass");
  });

  it('applies "glass-strong" class for variant="strong"', () => {
    const { container } = render(<GlassCard variant="strong">B</GlassCard>);
    expect(container.firstChild).toHaveClass("glass-strong");
  });

  it('applies "glass-subtle" class for variant="subtle"', () => {
    const { container } = render(<GlassCard variant="subtle">C</GlassCard>);
    expect(container.firstChild).toHaveClass("glass-subtle");
  });

  it("applies custom className alongside variant class", () => {
    const { container } = render(
      <GlassCard className="my-custom-class">Content</GlassCard>,
    );
    expect(container.firstChild).toHaveClass("glass");
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  it("renders with hover prop and still shows children and correct class", () => {
    const { container } = render(
      <GlassCard hover>Hoverable Content</GlassCard>,
    );
    expect(screen.getByText("Hoverable Content")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("glass");
  });

  it("renders without hover prop as a plain div", () => {
    const { container } = render(<GlassCard hover={false}>Plain</GlassCard>);
    expect(screen.getByText("Plain")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("glass");
  });
});
