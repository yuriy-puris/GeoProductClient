<template>
    <div class="page-container">
        <button 
          class="btn btn-back"
          @click="backHome">
          <md-icon>keyboard_backspace</md-icon>
          <md-tooltip md-direction="left">Изменить адрес</md-tooltip>
        </button>
        <div 
          v-if="searchAddress!==''"
          class="actual-address">
          Поиск по адресу: <span>{{ searchAddress }}</span>
        </div>
        <Search
          @clearProduct="clearProduct" 
          @searchProduct="searchProduct"/>
        <ProductsGrid ref="productsGrid" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue';
import ProductsGrid from '@/components/Grid/ProductsGrid.vue';
import { mapState } from 'vuex';

@Component({
  components: {
    Search,
    ProductsGrid,
  },
})
export default class Grid extends Vue {
  public query: string = '';
  private searchAddress: string = '';
  private tooltipActive: boolean = false;

  public searchProduct(searchQuery: string): void {
    (this.$refs.productsGrid as any ).search(searchQuery);
  }

  public clearProduct(): void {
    (this.$refs.productsGrid as any ).clear();
  }

  public backHome(): void {
    if ( localStorage.getItem('activeSearchAddress') ) {
      localStorage.removeItem('activeSearchAddress');
    }
    this.$router.push({name: 'home'});
  }

  private mounted(): void {
    const address = localStorage.getItem('activeSearchAddress');
    this.searchAddress = address !== null ? JSON.parse(address).address : '';
  }
}

</script>

<style lang="scss">
  .actual-address {
    border: 1px solid #ff5252;
    display: inline-block;
    padding: 3px 10px;
    margin: 0 0 0 20px;  
    color: #e4e4e4;
    font-size: 12px;
    span {
      font-weight: 600;
    }
  }
  .btn {
    &.btn-back {
      background: #424242;
      border-color: transparent;
      color: #fff;
      border-radius: 3px;
      padding: 3px 10px;
      opacity: .7;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>