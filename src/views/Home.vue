<template>
  <div class="home">
    <div class="page-container">
      <Search @searchProduct="searchProduct"/>
      <ProductsGrid 
        ref="productsGrid" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue';
import ProductsGrid from '@/components/Grid/ProductsGrid.vue';


@Component({
  components: {
    Search,
    ProductsGrid,
  },
})

export default class Home extends Vue {
  public query: string = '';

  public searchProduct(searchQuery: string): void {
    (this.$refs.productsGrid as any ).search(searchQuery);
  }
}

</script>
