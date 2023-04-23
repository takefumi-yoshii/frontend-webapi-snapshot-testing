import { rest } from "msw";
import { CreatePostResponse } from "./type";
import { path } from "..";

type MockHandlerFactoryArgs<T> = {
  mockFn?: jest.Mock;
  stub?: T;
};

export function mockCreatePost(
  args?: MockHandlerFactoryArgs<CreatePostResponse>
) {
  return rest.post<{}, {}, CreatePostResponse>(
    path("/api/posts"),
    async (_req, res, ctx) => {
      const data = await _req.json();
      args?.mockFn?.(data);
      return res(ctx.json(args?.stub ?? { title: "Hello World" }));
    }
  );
}
