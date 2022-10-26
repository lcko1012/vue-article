<script setup lang="ts">
import { Form, Field } from "vee-validate";
import ArticleDataService from "@/services/ArticleDataService";
import { ref } from "vue";

export interface ICreateArticle {
  title: string;
  content: string;
  thumbnail: string;
  isPublic?: boolean;
}

const isSuccess = ref<boolean>(false);
const schema = {
  title: "required|minMaxLength:5,255",
  content: "required",
  thumbnail: "required|url",
};

const handleSubmit = async (values: Record<string, unknown>) => {
  const temp = values as ICreateArticle & Record<string, unknown>;
  await ArticleDataService.create({
    title: temp.title,
    content: temp.content,
    thumbnail: temp.thumbnail,
    isPublic: !!temp.isPublic,
  });

  isSuccess.value = true;
};
</script>

<template>
  <div class="w-screen h-screen flex justify-center">
    <div>
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
        class="w-[800px] grid grid-rows-1 gap-1 rounded-lg"
      >
        <h1 class="text-center text-3xl my-5">New Article</h1>

        <label>Title:</label>
        <Field
          type="text"
          name="title"
          class="p-1 border-gray-200 border rounded-lg outline-0"
        />
        <span class="text-red-400">{{ errors.title }}</span>

        <label>Content:</label>
        <Field
          as="textarea"
          name="content"
          rows="20"
          class="p-1 border-gray-200 border rounded-lg outline-0"
        />
        <span class="text-red-400">{{ errors.content }}</span>

        <label>Thumbnail URL:</label>
        <Field
          type="text"
          name="thumbnail"
          class="p-1 border-gray-200 border rounded-lg outline-0"
        />
        <span class="text-red-400">{{ errors.thumbnail }}</span>

        <div>
          <Field
            id="isPublic"
            type="checkbox"
            name="isPublic"
            :value="true"
            :unchecked-value="false"
          />
          <label for="isPublic" class="ml-1 cursor-pointer">Public</label>
        </div>

        <button type="submit" class="p-2 bg-green-600 text-white rounded-lg">
          Submit
        </button>
      </Form>

      <span v-if="isSuccess" class="text-blue-400">
        Successfully created!
      </span>
    </div>
  </div>
</template>
