<template>
    <div>
        <v-ons-carousel v-if="data" fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
            <v-ons-carousel-item v-for="list in data.lists" :key="list.name" class="carousel-item">
            <v-ons-list class="list" >
                <v-ons-list-header :style="{ backgroundColor: list.color }">
                <span :style="{ color: 'white', 'mix-blend-mode': 'difference' }">{{list.name}}</span>
                </v-ons-list-header>
                <v-ons-list-item v-for="(item, $index) in list.items" :key="$index" tappable>
                <label class="left">
                    <v-ons-checkbox
                    :input-id="'checkbox-' + $index + '-' + list._id"
                    :value="item.name"
                    v-model="item.checked"
                    >
                    </v-ons-checkbox>
                </label>
                <label class="center" :for="'checkbox-' + $index + '-' + list._id">
                    {{item.name}}
                </label>
                <label class="right">
                    <v-ons-icon icon="fa-edit"></v-ons-icon>
                </label>
                <label class="right">
                    <v-ons-icon icon="fa-trash" @click="removeItem($index, list._id, item._id)"></v-ons-icon>
                </label>
                </v-ons-list-item>
            </v-ons-list>
            </v-ons-carousel-item>
        </v-ons-carousel>

        <div class="dots">
            <span v-for="dotIndex in listsCount" :key="dotIndex"
            @click="carouselIndex = dotIndex - 1"
            >
            {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
            </span>
        </div>

        <v-ons-fab position='bottom right' :cancelable="true" @click="addItem">
            <v-ons-icon icon="md-plus"></v-ons-icon>
        </v-ons-fab>{{data}}
    </div>
</template>

<script>
import API from '../../api';

export default {
  name: 'ListView',
  props: ["data"],
  data() {
    return {
      carouselIndex: 0,
      loggedIn: false
    };
  },
  computed: {
    listsCount() {
      if (this.apiResponse) {
        return this.apiResponse.lists.length;
      }
      return 0;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    addItem() {
      this.$ons.notification.prompt('What you need to get?', {cancelable: true, title: 'New item'}).then(name => {
        if (this.isLoggedIn) {
          API.addItem(this.data.lists[this.carouselIndex]._id, {name: name}).then( response => {
            this.data.lists[this.carouselIndex].items.push(
              {
                _id : response.data.id,
                name: name
              }
            );
          });
        }
        else {
          this.data.lists[this.carouselIndex].items.push({ name: name });
        }
      })
    },
    removeItem(index, listId, itemId) {
      if (this.isLoggedIn) {
        API.deleteItem(listId, itemId).then( () => {
          this.data.lists[this.carouselIndex].items.splice(index,1);
        });
      }
      else {
        this.data.lists[this.carouselIndex].items.splice(index,1);
      }
    }
  },
};
</script>
<style scoped>
.carousel-item {
  display: flex;
  justify-content: space-around;
}

.list {
  flex: 1;
  overflow: auto;
}

.color-tag {
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
<style>
.dots {
  text-align: center;
  font-size: 30px;
  color: gray;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}

.dots > span {
  cursor: pointer;
}
</style>