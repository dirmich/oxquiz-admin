<template>
  <div ref="dropzone" class="dropzone needsclick dz-clickable">
    <div class="dz-message needsclick">
      <slot />
    </div>
    <div class="dropzone-preview needsclick">
      <v-img
        v-if="imgsrc && imgsrc.length > 0"
        :src="imgsrc"
        height="250"
        contain
      />
    </div>
  </div>
</template>

<script>
  import DropZone from 'dropzone'

  export default {
    props: {
      option: {
        type: Object,
        default: () => ({}),
      },
      imgsrc: {
        type: String,
        defualt: '',
      },
      color: {
        type: String,
        default: 'black',
      },
    },

    computed: {
      options() {
        return Object.assign(
          {},
          {
            url: '/',
            method: 'POST',
            // maxFilesize: 1,
            addRemoveLinks: true,
            dictResponseError: 'Server not Configured',
            autoProcessQueue: false,
            // previewsContainer: ".dropzone-previews"
          },
          this.option
        )
      },
    },
    mounted() {
      if (this.dropzone) return
      const self = this
      DropZone.autoDiscover = false
      const dropzone = new DropZone(this.$refs.dropzone, this.options)
      dropzone.on('addedfile', file => {
        $('.dz-message').hide()
        self.$emit('added', dropzone, file)
      })

      dropzone.on('removedfile', function(file) {
        if (dropzone.files.length == 0) {
          $('.dz-message').show()
        }
        self.$emit('removed', dropzone, file)
      })
      this.dropzone = dropzone
    },

    beforeDestroy() {
      if (this.dropzone) this.dropzone.destroy()
    },
  }
</script>

<style lang="scss">
  @import 'dropzone/dist/min/dropzone.min.css';
  .dropzone {
    border: 1px dashed lightgray;
    font-size: 14pt;
    font-weight: bold;
    // .dz-preview .dz-details {
    // 	display: none;
    // }
    .dz-preview {
      // display: none;
      .dz-details {
        display: none;
      }
      .dz-progress {
        display: none;
      }
    }
  }
</style>
