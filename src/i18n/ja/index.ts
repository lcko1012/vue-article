import AdminTranslation from "./admin";

export default {
  ...AdminTranslation,
  menu: {
    home: "ホーム",
    language: "言語",
    login: "ログイン",
    greeting: "こんにちは {name}",
    admin: "アドミン",
  },
  views: {
    articles: {
      create: "作成",
    },
    createArticle: {
      new: "新しい記事",
      title: "タイトル",
      content: "内容",
      thumbnail: "サムネイル URL",
      public: "公開",
      submit: "送信",
      success: "成功に作成されました！",
    },
    articleDetails: {
      delete_header: "ノート",
      delete_text: "この投稿を削除しますか?",
      delete_success: "成功に削除されました!",
    },
    login: {
      title: "ログイン",
      email: "Eメール",
      password: "パスワード",
      submit: "ログイン",
      failed: "無効なメールアドレスまたはパスワード",
    },
  },
  components: {
    article: {
      articleItem: {
        read: "読む",
      },
    },
    core: {
      deleteConfirmModal: {
        delete: "消す",
        cancel: "カンセル",
      },
    },
    errors: {
      somethingWrong: "何かが間違っていました。もう一度やり直してください",
      authorization: "アクセス拒否",
    },
  },
};
