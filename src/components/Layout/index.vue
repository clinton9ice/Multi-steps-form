<template>
<main class="flex gap-3 h-full flex-wrap">
  <aside class="p-4 -z-10 relative h-[150px] lg:h-screen max-h-[98vh] text-white lg:max-w-[350px] w-full lg:rounded-[8px] my-auto bg-primary-purplish-blue overflow-hidden">

    <div class="relative text-white z-10">
      Test nvni

    </div>

    <div class="bottom absolute bottom-0 h-full w-full right-0">
      <img src="/src/assets/images/bg-sidebar-desktop.svg" alt="Aside image" class="w-full lg:visible invisible absolute -bottom-3 pointer-events-none left-0">
      <img src="/src/assets/images/bg-sidebar-mobile.svg" alt="Aside image" class="w-full lg:invisible pointer-events-none">
    </div>
  </aside>

  <section class="lg:px-16 px-3 py-16 flex-1">
    <slot />
  </section>

</main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>