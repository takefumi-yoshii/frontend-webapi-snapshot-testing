import { ReactRenderer } from "@storybook/react";
import { act, render } from "@testing-library/react";
import { PreparedStoryFn } from "@storybook/types";

export async function renderThenPlay(
  Story: PreparedStoryFn<ReactRenderer, Partial<{}>>
) {
  const view = render(<Story />);
  await act(async () => {
    await Story.play?.({ canvasElement: view.container });
  });
  return view;
}
