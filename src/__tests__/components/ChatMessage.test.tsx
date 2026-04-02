import React from "react";
import { render, screen } from "@testing-library/react";
import ChatMessage from "@/components/chat/ChatMessage";
import type { Message } from "@/types/chat";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const {
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
        ...rest
      } = props;
      return <div {...rest}>{children}</div>;
    },
    p: ({ children, ...props }: any) => {
      const {
        initial,
        animate,
        exit,
        transition,
        whileHover,
        whileTap,
        whileInView,
        variants,
        ...rest
      } = props;
      return <p {...rest}>{children}</p>;
    },
    span: ({ children, ...props }: any) => {
      const {
        initial,
        animate,
        exit,
        transition,
        whileHover,
        whileTap,
        whileInView,
        variants,
        ...rest
      } = props;
      return <span {...rest}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock("lucide-react", () => ({
  Sword: (props: any) => <svg data-testid="sword-icon" {...props} />,
}));

describe("ChatMessage", () => {
  const userMessage: Message = {
    id: "user-msg-1",
    role: "user",
    content: "Hello Vesemir",
    timestamp: new Date(2024, 0, 15, 14, 25, 0), // Jan 15 2024 14:25 local
  };

  const assistantMessage: Message = {
    id: "assistant-msg-1",
    role: "assistant",
    content: "Greetings, young witcher",
    timestamp: new Date(2024, 0, 15, 14, 26, 0),
  };

  it('renders user message with correct alignment and "Você" label', () => {
    render(<ChatMessage message={userMessage} />);
    const label = screen.getByText("Você");
    expect(label).toBeInTheDocument();
  });

  it('renders assistant message with "Vesemir" label', () => {
    render(<ChatMessage message={assistantMessage} />);
    const label = screen.getByText("Vesemir");
    expect(label).toBeInTheDocument();
  });

  it("displays message content", () => {
    render(<ChatMessage message={userMessage} />);
    expect(screen.getByText("Hello Vesemir")).toBeInTheDocument();
  });

  it("displays assistant message content", () => {
    render(<ChatMessage message={assistantMessage} />);
    expect(screen.getByText("Greetings, young witcher")).toBeInTheDocument();
  });

  it("shows timestamp", () => {
    render(<ChatMessage message={userMessage} />);
    // toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) produces a time like "14:25" or "2:25 PM"
    const timestampEl = screen.getByText(/\d{1,2}:\d{2}/);
    expect(timestampEl).toBeInTheDocument();
  });

  it("formats bold text wrapped in ** markers", () => {
    const boldMessage: Message = {
      id: "bold-msg-1",
      role: "assistant",
      content: "Use the **Igni** sign against the beast",
      timestamp: new Date(2024, 0, 15, 14, 30, 0),
    };

    render(<ChatMessage message={boldMessage} />);

    const boldElement = screen.getByText("Igni");
    expect(boldElement).toBeInTheDocument();
    expect(boldElement.tagName).toBe("STRONG");
    expect(boldElement).toHaveClass("font-semibold");
  });

  it("renders persona emoji icon for assistant messages", () => {
    render(<ChatMessage message={assistantMessage} />);
    const icon = screen.getByRole("img", { name: "Vesemir" });
    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toBe("🐺");
  });

  it("does not render persona emoji icon for user messages", () => {
    render(<ChatMessage message={userMessage} />);
    expect(
      screen.queryByRole("img", { name: "Vesemir" }),
    ).not.toBeInTheDocument();
  });
});
