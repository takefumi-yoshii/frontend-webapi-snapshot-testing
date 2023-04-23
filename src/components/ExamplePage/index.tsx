import { createPost } from "@/services/clients/posts";
import { useState } from "react";

export const ExamplePage = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div>
      <h1>Example Page</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          //////////////// ↓↓↓ テスト対象ここから ↓↓↓
          const input = value.trim();
          // doSomething()、のように関数に切り出されて単体テストが書かれていれば問題となりにくいが、
          // このコンポーネントスコープの State を多数参照していたり、複雑な処理を多数書いている状況を前提とする。
          // この状況をリファクタリングする前には、リグレッションを書いておきたい。
          // 例えば、value.trim(); の処理がリファクタリングで欠落した場合、リグレッションが発生する。
          // const input = value;
          //////////////// ↑↑↑ テスト対象ここまで ↑↑↑
          // ↓ この Payload にリグレッションがないか確認したい
          const data = await createPost({ payload: { value: input } });
          // ↓ 以下の画面遷移テストが書かれていても、MSWがスタブを返すため、Payload のリグレッションに気付けない可能性がある。
          // router.push(`/path/to/page/${data.id}`)
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button>submit</button>
      </form>
    </div>
  );
};
