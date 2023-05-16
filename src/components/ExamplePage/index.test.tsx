import { composeStories } from "@storybook/react";
import * as stories from "./index.stories";
import { waitFor } from "@testing-library/react";
import { mockCreatePost } from "@/services/clients/posts/index.mock";
import { setupMockServer } from "@/tests/jest/msw";
import { renderThenPlay } from "@/tests/jest/storybook";

const server = setupMockServer();
const { NormalInput, WithWhiteSpaceInput } = composeStories(stories);

test("通常入力", async () => {
  // WebAPI の payload を記録するスパイを用意
  const mockFn = jest.fn();
  // MSW のハンドラーを設定
  server.use(mockCreatePost({ mockFn }));
  // Story をレンダリングして PlayFunction を再生する
  await renderThenPlay(NormalInput);
  await waitFor(() => expect(mockFn).toHaveBeecCalledTimes(1));
  // スナップショットテストをアサーションとして使用
  expect(mockFn.mock.lastCall[0]).toMatchSnapshot()
});

test("送信値に空白が含まれるパターン", async () => {
  // WebAPI の payload を記録するスパイを用意
  const mockFn = jest.fn();
  // MSW のハンドラーを設定
  server.use(mockCreatePost({ mockFn }));
  // Story をレンダリングして PlayFunction を再生する
  await renderThenPlay(WithWhiteSpaceInput);
  await waitFor(() => expect(mockFn).toHaveBeecCalledTimes(1));
  // スナップショットテストをアサーションとして使用
  expect(mockFn.mock.lastCall[0]).toMatchSnapshot()
});
