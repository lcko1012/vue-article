<script setup lang="ts">
interface IProps {
  height: string;
  color: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <FontAwesomeIcon
    icon="sun"
    :class="[props.height, props.color]"
    class="spinner loader"
  />
</template>

<style>
.loader {
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
