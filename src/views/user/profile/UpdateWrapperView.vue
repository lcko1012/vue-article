<template>
  <div class="px-12 py-12 bg-slate-50 min-h-body">
    <h1 class="mb-5 text-xl text-gray-900">
      {{ $t("views.updateWrapper.title") }}
    </h1>

    <div class="grid grid-cols-12 gap-4 h-9">
      <div class="col-span-2 rounded-lg">
        <div class="bg-white">
          <RouterLink
            to="information"
            class="p-3 rounded-lg cursor-pointer block"
          >
            {{ $t("views.updateWrapper.information") }}
          </RouterLink>

          <div class="p-3 rounded-lg cursor-pointer">
            {{ $t("views.updateWrapper.password") }}
          </div>
        </div>
      </div>

      <div class="col-span-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
