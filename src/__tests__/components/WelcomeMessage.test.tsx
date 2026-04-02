import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WelcomeMessage from "@/components/chat/WelcomeMessage";

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
    p: ({
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
    }: any) => <p {...props}>{children}</p>,
    button: ({
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
    }: any) => <button {...props}>{children}</button>,
    span: ({
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
    }: any) => <span {...props}>{children}</span>,
    h2: ({
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
    }: any) => <h2 {...props}>{children}</h2>,
    footer: ({
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
    }: any) => <footer {...props}>{children}</footer>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({ start: jest.fn() }),
}));

jest.mock("lucide-react", () => ({
  Sword: (props: any) => <svg data-testid="sword-icon" {...props} />,
}));

describe("WelcomeMessage", () => {
  const mockOnSelectQuestion = jest.fn();

  beforeEach(() => {
    mockOnSelectQuestion.mockClear();
  });

  it("renders welcome title with persona name", () => {
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);
    expect(screen.getByText("Vesemir")).toBeInTheDocument();
  });

  it("renders Vesemir's welcome text", () => {
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);
    expect(
      screen.getByText(/Sou Vesemir, o mais velho bruxo de Kaer Morhen/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/O Caminho é longo, mas estou aqui para guiá-lo/),
    ).toBeInTheDocument();
  });

  it("renders suggestion chips", () => {
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);

    const expectedQuestions = [
      "Quais são os Sinais dos Bruxos?",
      "Como derrotar o Grifino?",
      "Conte sobre Ciri",
      "Melhores builds para Geralt",
    ];

    expectedQuestions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  it("calls onSelectQuestion when a suggestion chip is clicked", async () => {
    const user = userEvent.setup();
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);

    await user.click(screen.getByText("Conte sobre Ciri"));
    expect(mockOnSelectQuestion).toHaveBeenCalledTimes(1);
    expect(mockOnSelectQuestion).toHaveBeenCalledWith("Conte sobre Ciri");
  });

  it("calls onSelectQuestion with the correct question for each chip", async () => {
    const user = userEvent.setup();
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);

    await user.click(screen.getByText("Quais são os Sinais dos Bruxos?"));
    expect(mockOnSelectQuestion).toHaveBeenCalledWith(
      "Quais são os Sinais dos Bruxos?",
    );

    mockOnSelectQuestion.mockClear();

    await user.click(screen.getByText("Como derrotar o Grifino?"));
    expect(mockOnSelectQuestion).toHaveBeenCalledWith(
      "Como derrotar o Grifino?",
    );
  });

  it("renders the persona icon", () => {
    render(<WelcomeMessage onSelectQuestion={mockOnSelectQuestion} />);
    expect(screen.getByRole("img", { name: "Vesemir" })).toBeInTheDocument();
  });
});
