import { composeStories } from "@storybook/react";
import * as stories from "./index.stories";
import { waitFor } from "@testing-library/react";
import { mockCreatePost } from "@/services/clients/posts/index.mock";
import { setupMockServer } from "@/tests/jest/msw";
import { renderThenPlay } from "@/tests/jest/storybook";

const server = setupMockServer();
const { Primary } = composeStories(stories);

test("送信値は空白が除去される", async () => {
  // WebAPI の payload を記録するスパイを用意
  const mockFn = jest.fn();
  // MSW のハンドラーを設定
  server.use(mockCreatePost({ mockFn }));
  // Story をレンダリングして PlayFunction を再生する
  await renderThenPlay(Primary);
  // スナップショットテストをアサーションとして使用
  await waitFor(() => expect(mockFn.mock.lastCall[0]).toMatchSnapshot());
});
