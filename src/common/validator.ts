import { defineRule } from "vee-validate";
import { required, min, max } from "@vee-validate/rules";

defineRule("required", (value: string) => {
  if (required(value)) {
    return true;
  }

  return "This field is required";
});

defineRule(
  "minMaxLength",
  (value: string, [minLength, maxLength]: Array<number>) => {
    if (
      min(value, { length: minLength }) &&
      max(value, { length: maxLength })
    ) {
      return true;
    }

    return `This filed must be between ${minLength} and ${maxLength} characters`;
  }
);

defineRule("url", (value: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return pattern.test(value) || !value.length ? true : "Must be a valid URL";
});
