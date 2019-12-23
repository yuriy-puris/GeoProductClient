<template>
    <div 
        v-if="isVisibleFilter"
        :class="['filter-shop', { 'is-visible': visibleDropDown }]">
        <div 
            class="selected-field"
            @click="visibleDropDown = !visibleDropDown">
            {{ Object.keys(selected).length ? selected.label : 'Текущие магазины' }}
            <md-icon>keyboard_arrow_down</md-icon> 
            <button
                v-show="Object.keys(selected).length" 
                class="icon-close"
                @click.stop="clear">
                <md-icon>close</md-icon>
            </button>
        </div>
        <ul>
            <li 
                v-for="(shop, idx) in source"
                :key="idx"
                @click="onSelected(shop, idx)"
                :class="[(idx === selectedIdx) ? 'is-selected' : '']">
                {{ shop.label }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

interface GeneralShopItem {
  id: number;
  label: string;
}

@Component({
    props: {
        dataSource: {
            type: Array as () => GeneralShopItem[],
        },
    },
})
export default class FilterShop extends Vue {
    public source: any[] = [];
    private dataSource: GeneralShopItem[];
    private selected: object = {};
    private selectedIdx: number = -1;
    private visibleDropDown: boolean = false;
    private isVisibleFilter: boolean = false;

    @Watch('dataSource')
    private onChangeDS(): void {
        const result: any = this.dataSource;
        this.source = [].concat(result);
        console.log(this.source);
        if (this.source.length) { this.isVisibleFilter = true; }
    }

    private onSelected(Shop: any, Idx: number): void {
        this.selectedIdx = Idx;
        this.selected = Shop;
        this.$emit('selected', this.selected);
    }

    private clear(): void {
        this.selectedIdx = -1;
        this.selected = {};
        this.$emit('clearSelected');
    }

}

</script>

<style lang="scss">
.filter-shop {
    position: relative;
    min-width: 200px;
    text-align: left;
    .selected-field {
        position: relative;
        border: 1px solid #fff;
        padding: 5px 20px 5px 10px;
        cursor: pointer;
        user-select: none;
        > .md-icon {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-12px);
            transition: transform .3s;
        }
    }
    ul {
        border: 1px solid;
        border-color: transparent #fff #fff #fff;
        transition: opacity .3s;
        opacity: 0;
        visibility: hidden;
    }
    &.is-visible {
        ul {
            visibility: visible;
            opacity: 1;
        }
        .selected-field {
            > .md-icon {
                transform: translateY(-12px) rotate(-180deg);
            }
        }
    }
    li {
        padding: 5px 10px;
        cursor: pointer;
        transition: background .3s, color .3s;
        &:hover,
        &.is-selected {
            background: #fff;
            color: #000;
        }
    }
    .icon-close {
        position: absolute;
        right: 24px;
        top: 50%;
        background: transparent;
        outline: none;
        border-color: transparent;
        padding: 0;
        transform: translateY(-11px);
        cursor: pointer;
        i {
            font-size: 12px !important;
            width: 14px;
            min-width: 14px;
            height: 14px;
        }
    }
}
</style>