<template>
  <main class="main">
    <div class="container main__container">
      <!-- <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs> -->
      <RouterView />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      items: ['Товари']
    };
  }
};
</script>
