import AdminTranslation from "./admin";

export default {
  ...AdminTranslation,
  menu: {
    home: "ホーム",
    language: "言語",
    login: "ログイン",
    admin: "アドミン",
    update: "更新情報",
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
      follow: "フォロー",
      about: "について",
      joined: "参加した",
      posted_on: "{date} に投稿した",
    },
    login: {
      title: "ログイン",
      email: "Eメール",
      password: "パスワード",
      submit: "ログイン",
      failed: "無効なメールアドレスまたはパスワード",
    },
    updateWrapper: {
      title: "プロフィールを更新",
      information: "インフォメーション",
      password: "パスワード",
      updateInformation: {
        avatar: "アバター",
        upload: "アップロード",
        username: "ユーザーネーム",
        email: "Eメール",
        name: "ネーム",
        about: "について",
        save: "保存",
        success: "更新しました！",
      },
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
