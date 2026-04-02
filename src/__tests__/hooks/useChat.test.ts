import { renderHook, act } from '@testing-library/react';
import { useChat } from '@/hooks/useChat';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  it('has empty messages, isLoading false, and error null initially', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sendMessage adds user message to state', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Greetings, young witcher.' }),
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Hello Vesemir');
    });

    const userMsg = result.current.messages.find((m) => m.role === 'user');
    expect(userMsg).toBeDefined();
    expect(userMsg!.content).toBe('Hello Vesemir');
  });

  it('sendMessage adds assistant message after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'The path is treacherous.' }),
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Tell me about monsters');
    });

    const assistantMsg = result.current.messages.find(
      (m) => m.role === 'assistant',
    );
    expect(assistantMsg).toBeDefined();
    expect(assistantMsg!.content).toBe('The path is treacherous.');
  });

  it('sets error when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.error).toBe('Server error');
  });

  it('clearChat resets messages, isLoading, and error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Greetings.' }),
    });

    const { result } = renderHook(() => useChat());

    // First, add some messages
    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages.length).toBeGreaterThan(0);

    // Now clear
    act(() => {
      result.current.clearChat();
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('does not send empty messages', async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('   ');
    });

    expect(result.current.messages).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('isLoading is false after sendMessage completes', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Done.' }),
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Test');
    });

    expect(result.current.isLoading).toBe(false);
  });
});
