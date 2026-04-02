import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "@/components/chat/ChatInput";

jest.mock("lucide-react", () => ({
  Send: (props: any) => <svg data-testid="send-icon" {...props} />,
}));

describe("ChatInput", () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
  });

  it("renders textarea with correct placeholder", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={false} />);

    expect(
      screen.getByPlaceholderText("Pergunte ao Vesemir sobre The Witcher 3..."),
    ).toBeInTheDocument();
  });

  it("calls onSendMessage when clicking send button", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={false} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello Vesemir");

    const sendButton = screen.getByLabelText("Enviar mensagem");
    await user.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
    expect(mockOnSendMessage).toHaveBeenCalledWith("Hello Vesemir");
  });

  it("clears input after sending", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={false} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test message");

    const sendButton = screen.getByLabelText("Enviar mensagem");
    await user.click(sendButton);

    expect(textarea).toHaveValue("");
  });

  it("does not send empty messages", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={false} />);

    const sendButton = screen.getByLabelText("Enviar mensagem");

    // Button should be disabled when input is empty
    expect(sendButton).toBeDisabled();

    // Attempt click on disabled button – callback must not fire
    await user.click(sendButton);
    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it("disables input when isLoading is true", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={true} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });
});
