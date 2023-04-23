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

export const Primary: Story = {
  storyName: "送信値は空白が除去される",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "  abcd  ");
    await userEvent.click(canvas.getByRole("button", { name: "submit" }));
  },
};
