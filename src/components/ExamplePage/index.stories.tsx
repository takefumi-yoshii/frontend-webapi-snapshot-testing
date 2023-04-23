import { mockCreatePost } from "@/services/clients/posts/index.mock";
import type { Meta, StoryObj } from "@storybook/react";
import { ExamplePage } from "./";
import { userEvent, within } from "@storybook/testing-library";

const meta = {
  component: ExamplePage,
  parameters: {
    msw: [mockCreatePost()],
  },
} satisfies Meta<typeof ExamplePage>;

export default meta;
type Story = StoryObj<typeof meta>;

function createPlay(input: string) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), input);
    await userEvent.click(canvas.getByRole("button", { name: "submit" }));
  };
}

export const NormalInput: Story = {
  storyName: "通常入力",
  play: createPlay("abcd"),
};

export const WithWhiteSpaceInput: Story = {
  storyName: "送信値に空白が含まれるパターン",
  play: createPlay("  abcd  "),
};
