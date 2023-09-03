<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 回到上一頁 previousPage -->
      <li v-show="previousPage" :class="['page-item', { disabled: currentPage === 1 }]">
        <router-link class="page-link" aria-label="Previous" :to="{
          name: routeName,
          query: { ...queryElement, page: previousPage },
        }">
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <!-- 頁碼 -->
      <li v-for="page in totalPage" :key="page" :class="['page-item', { active: currentPage === page }]">
        <RouterLink :to="{ name: routeName, query: { ...queryElement, page } }" class="page-link">
          {{ page }}
        </RouterLink>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li v-show="nextPage" :class="['page-item', { disabled: currentPage === totalPage.length }]">
        <router-link class="page-link" :to="{ name: routeName, query: { ...queryElement, page: nextPage } }"
          aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: { Number, default: 1 },
  totalPage: { Array, default: [1] },
  previousPage: Number,
  nextPage: Number,
  routeName: String,
  queryElement: Object
});

</script>