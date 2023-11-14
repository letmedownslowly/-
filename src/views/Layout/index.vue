<script setup>
import LayoutNav from "./components/LayoutNav";
import LayoutHeader from "./components/LayoutHeader";
import LayoutFooter from "./components/LayoutFooter.vue";
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>