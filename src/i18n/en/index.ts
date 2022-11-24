import AdminTranslation from "./admin";

export default {
  ...AdminTranslation,
  menu: {
    home: "Home",
    language: "Language",
    login: "Login",
    admin: "Admin",
    update: "Update",
  },
  views: {
    articles: {
      create: "Create",
    },
    createArticle: {
      title: "Title",
      title_here: "title here...",
      content: "Content",
      thumbnail: "Add a thumbnail",
      public: "Public",
      submit: "Submit",
      success: "Successfully created!",
    },
    articleDetails: {
      delete_header: "Note",
      delete_text: "Do you want to delete this article?",
      delete_success: "Successfully deleted!",
      follow: "Follow",
      about: "About",
      joined: "Joined",
      posted_on: "Posted on {date}",
    },
    login: {
      title: "Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      failed: "Invalid email or password",
    },
    updateWrapper: {
      title: "Update Profile",
      information: "Information",
      password: "Password",
      updateInformation: {
        avatar: "Avatar",
        upload: "Upload",
        username: "Username",
        email: "Email",
        name: "Name",
        about: "About",
        save: "Save",
        success: "Successfully updated!",
      },
    },
  },
  components: {
    article: {
      articleItem: {
        read: "Read",
      },
    },
    core: {
      deleteConfirmModal: {
        delete: "Delete",
        cancel: "Cancel",
      },
    },
  },
  errors: {
    somethingWrong: "Something went wrong, please try again",
    authorization: "Access denied",
    cant_upload_file: "Couldn't upload file {name}",
  },
};
