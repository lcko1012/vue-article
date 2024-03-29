import { defineRule } from "vee-validate";
import {
  required,
  min,
  max,
  url,
  email,
  image,
  size,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule(
  "minMaxLength",
  (value: string, [minLength, maxLength]: Array<number>) => {
    return (
      min(value, { length: minLength }) && max(value, { length: maxLength })
    );
  }
);
defineRule("url", url);
defineRule("email", email);
defineRule("image", image);
defineRule("size", size);
