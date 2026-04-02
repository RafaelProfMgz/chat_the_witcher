import React from "react";
import { render, screen } from "@testing-library/react";
import TypingIndicator from "@/components/chat/TypingIndicator";

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
        ...domProps
      } = props;
      return <div {...domProps}>{children}</div>;
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
        layout,
        layoutId,
        ...domProps
      } = props;
      return <span {...domProps}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({ start: jest.fn() }),
}));

jest.mock("lucide-react", () => ({
  Sword: (props: any) => <svg data-testid="sword-icon" {...props} />,
}));

describe("TypingIndicator", () => {
  it('renders "Vesemir está meditando..." text when visible', () => {
    render(<TypingIndicator isVisible={true} />);
    expect(screen.getByText("Vesemir está meditando...")).toBeInTheDocument();
  });

  it("renders three bouncing dots when visible", () => {
    render(<TypingIndicator isVisible={true} />);
    const dotsContainer = screen.getByLabelText("Vesemir está digitando");
    const dots = dotsContainer.querySelectorAll("span");
    expect(dots).toHaveLength(3);
  });

  it("does not render content when not visible", () => {
    render(<TypingIndicator isVisible={false} />);
    expect(
      screen.queryByText("Vesemir está meditando..."),
    ).not.toBeInTheDocument();
  });
});
