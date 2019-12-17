<template>
    <div class="filter-shop">
        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script>
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilterShop extends Vue {

    @Prop({ type: Array, required: true })
    public dataSource!: string[];
    

}

</script>