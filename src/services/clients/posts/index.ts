import { defaultHeaders, path } from "..";
import { CreatePostResponse } from "./type";

export async function createPost(input: unknown): Promise<CreatePostResponse> {
  const data = await fetch(path("/api/posts"), {
    method: "POST",
    headers: { ...defaultHeaders },
    body: JSON.stringify(input),
  }).then((res) => res.json());
  return data;
}
