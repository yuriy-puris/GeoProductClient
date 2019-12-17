<template>
  <div class="product-container">
    <FilterShop 
      :dataSource=['This', 'is', 'Bob'] />
    <div
      v-for="(product, idx) in products"
      :key="idx" 
      class="product-item">
      <div class="product-img">
        <img :src="product.img" :alt="product.title">
      </div>
      <div class="product-title">
        {{ product.title }}
      </div>
      <div class="product-price">
        {{ product.price }}
      </div>
    </div>
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
    }),
  },
})

export default class ProductsGrid extends Vue {
  public location: object;
  public query: string;
  private products = [];
  private shops = [];

  public search(Query: string): void {
    const data = {
        search_query: Query,
        user_location: this.location,
    };
    this.$http
      .post('http://127.0.0.1:8000/api/store/post_location', data)
      .then((response: any): void => {
          this.products = response.data.Records;
      })
      .catch((error: any): void => {
        console.log(error);
      });
    }
}

</script>

<style lang="scss">
.product-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
  }
  .product-title {
    margin: 0 0 15px;
  }
  .product-price {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 10px;
  }
}
</style>
