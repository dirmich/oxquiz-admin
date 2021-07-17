<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-breakpoint="991"
    width="260"
  >
    <!-- <v-img
      :src="image"
      height="100%"
    > -->
    <v-col tag="v-list" fill-height>
      <v-list-item>
        <v-list-item-avatar color="white" v-if="logo">
          <v-img :src="logo" height="34" contain />
        </v-list-item-avatar>
        <v-list-item-title :class="{ title: !logo }">
          {{ title }}
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item v-if="responsive">
        <v-text-field
          class="purple-input search-input"
          label="Search..."
          color="purple"
        />
      </v-list-item>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :active-class="color"
        @click="link.action && link.action()"
        class="v-list-item"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-col>
    <!-- </v-img> -->
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { mapMutations, mapState } from 'vuex'

  export default {
    props: {
      title: {
        type: String,
        default: 'Highmaru Admin.',
      },
      logo: String,
      links: {
        type: Array,
        default: [],
      },
    },
    data: () => ({
      responsive: false,
    }),
    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.setDrawer(val)
        },
      },
      items() {
        return this.$t('Layout.View.items')
      },
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .title {
    text-align: center;
  }
</style>
