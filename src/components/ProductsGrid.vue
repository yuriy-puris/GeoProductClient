<template>
  <div class="product-container">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium repudiandae dignissimos officia? Omnis quidem accusamus sunt fugiat et. Quas veritatis sint earum eos quos qui aspernatur beatae illo amet ullam vero aliquam est, repellat illum maxime, corrupti optio quo enim atque! Incidunt cupiditate eius veritatis nesciunt dolor nihil totam molestiae, iusto deleniti quaerat, voluptates mollitia quasi dignissimos soluta. Voluptas fuga cumque fugiat similique, veniam nemo. Corporis voluptatibus tempora magni eaque suscipit debitis beatae expedita reprehenderit animi totam. Asperiores doloremque earum reiciendis, odit facere sit debitis, ratione autem consequuntur eius reprehenderit expedita quam porro eaque fuga commodi, ab molestiae? Eos, magni.
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

@Component({
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

  @Watch('query')
  public search(): void {
    const data = {
        search_query: this.query,
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
    max-width: 220px;
    background: #fff;
    border-radius: 5px;
    padding: 5px;
    margin: 0 5px 15px;
  }
  .product-img {
    margin: 0 0 20px;
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
