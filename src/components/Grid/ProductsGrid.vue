<template>
  <div class="product-holder">
    <md-progress-spinner
      v-if="isLoadingProducts" 
      class="md-accent" 
      md-mode="indeterminate">
      </md-progress-spinner>
    <div class="filters-holder">
      <FilterShop 
        :dataSource=dataShops 
        @selected="onSelected" 
        @clearSelected="onClearSelected" />
    </div>
    <div class="product-container">
      <div
        v-for="(product, idx) in products"
        :key="idx" 
        class="product-item">
        <div 
          @click="onClickProduct(product.url)" 
          class="product-img">
          <img :src="product.img" :alt="product.title">
        </div>
        <div 
          @click="onClickProduct(product.url)"
          class="product-title">
          {{ product.title }}
        </div>
        <div class="product-price">
          {{ product.price }}
        </div>
      </div>
    </div>
    <md-dialog-confirm
      :md-active.sync="activeDialog"
      md-content="Вы будете перенаправлены на этот товар в магазин"
      md-confirm-text="Да"
      md-cancel-text="Нет"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';
import { mapState } from 'vuex';

import FilterShop from '@/components/Grid/Filters/FilterShop.vue';

@Component({
  components: {
    FilterShop,
  },
  props: {
    query: {
      type: String,
    },
  },
  computed: {
    ...mapState({
        location: 'currentLocation',
        locationSearchAddress: 'currentLocationSearchAddress',
    }),
  },
})

export default class ProductsGrid extends Vue {
  public location: object;
  public locationSearchAddress: object;
  public query: string;
  private products = [];
  private dataProducts = [];
  private dataShops = [];
  private activeDialog = false;
  private activeProductUrl: string = '';
  private isLoadingProducts: boolean = false;

  public search(Query: string): void {
    const activeLocation = localStorage.getItem('activeSearchAddress') ? this.locationSearchAddress : this.location;
    const data = {
        search_query: Query,
        user_location: activeLocation,
    };
    this.isLoadingProducts = true;
    this.$http
      .post('http://127.0.0.1:8000/api/store/post_location', data)
      .then((response: any): void => {
          this.dataProducts = response.data.Records;
          this.products = [].concat(this.dataProducts);
          this.dataShops = response.data.Shops;
          this.isLoadingProducts = false;
      })
      .catch((error: any): void => {
        console.log(error);
        this.isLoadingProducts = false;
      });
  }

  public clear(): void {
    this.dataProducts = [];
    this.dataShops = [];
    this.products = [];
  }

  private onSelected(Shop: any): void {
    const filtered = this.dataProducts.filter((item: any) => item.shop_id === Shop.id);
    this.products = [].concat(filtered);
  }

  private onClearSelected(): void {
    this.products = [].concat(this.dataProducts);
  }

  private async onClickProduct(Url: string) {
    this.activeDialog = true;
    this.activeProductUrl = Url;
  }

  private onCancel(): void {
    console.log('cancel');
  }

  private onConfirm() {
    this.activeDialog = false;
    window.open(this.activeProductUrl, '_blank');
  }

}

</script>

<style lang="scss">
.product-holder {
  position: relative;
  .filters-holder {
    display: flex;
    justify-content: center;
  }
  .md-progress-spinner {
    position: absolute;
  }
}
.product-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 0 20px;
  position: relative;
  .product-item {
    font-size: 12px;
    max-width: 160px;
    border-radius: 5px;
    padding: 5px;
    margin: 0 20px 20px;
    color: #fff;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .product-img {
    margin: 0 0 20px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }
  .product-title {
    margin: 0 0 15px;
    cursor: pointer;
  }
  .product-price {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 10px;
  }
}
</style>