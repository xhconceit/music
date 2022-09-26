<template>
  <div ref="rootRef" class="suggest" v-loading[loadingText]="!singer.length && !songs.length" v-no-result="noResult">
    <ul class="suggest-list">
      <li class="suggest-item" v-show="singer.length && showSinger" v-for="s in singer" :key="s.mid" @click="selectSinger(s)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{s.name}}</p>
        </div>
      </li>
      <li class="suggest-item" @click="selectSong(song)" v-for="song in songs" :key="song.id">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{song.singer}}-{{song.name}}</p>
        </div>
      </li>
      <!-- <div class="suggest-item" v-loading:[loadingText]="pullupLoading"> </div> -->
    </ul>
  </div>
</template>

<script>
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import { computed, ref, watch } from 'vue'
// import usePullUpLoad from './use-pull-up-load'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-song', 'select-singer'],
  setup (props, { emit }) {
    const singer = ref([])
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    const loadingText = ref('')

    // const { rootRef, scroll, isPullUpLoad } = usePullUpLoad(searchMore)

    const noResult = computed(() => {
      return !singer.value.length && !songs.value.length && !hasMore.value
    })
    const loading = computed(() => {
      return !singer.value.length && !songs.value.length
    })

    // const pullupLoading = computed(() => {
    //   return isPullUpLoad.value && hasMore.value
    // })

    watch(() => props.query, async function (newQuery) {
      if (!newQuery) {
        return
      }
      await searchFirst()
    })
    async function searchFirst () {
      page.value = 1
      songs.value = []
      singer.value = []
      hasMore.value = true
      const result = await search(props.query, page.value, props.showSinger)
      // eslint-disable-next-line quote-props, key-spacing, quotes, comma-spacing, object-curly-spacing
      // const result = [{"docid":"361608130","id":"361608130","mid":"002yfDQn4YfckB","name":"给你一瓶魔法药水","singer":"告五人"},{"docid":"247817510","id":"247817510","mid":"000lu1gN36aAO9","name":"带我去找夜生活","singer":"告五人"},{"docid":"291692590","id":"291692590","mid":"0023jgxa0Ym5yo","name":"唯一","singer":"告五人"},{"docid":"232967259","id":"232967259","mid":"0029B8mN2eOjhw","name":"爱人错过","singer":"告五人"}]
      songs.value = await processSongs(result.songs)
      console.log(songs.value)
      singer.value = result.singer
      hasMore.value = result.hasMore
    }

    // async function searchMore () {
    //   if (!hasMore.value) {
    //     return
    //   }
    //   page.value++
    //   const result = await search(props.query, page.value, props.showSinger)
    //   songs.value = songs.value.concat(await processSongs(result.songs))
    //   hasMore.value = result.hasMore
    // }

    function selectSong (song) {
      emit('select-song', song)
    }

    function selectSinger (singer) {
      emit('select-singer', singer)
    }

    return {
      singer,
      songs,
      hasMore,
      loadingText,
      noResult,
      loading,
      // rootRef,
      // scroll,
      // isPullUpLoad,
      // pullupLoading,
      selectSong,
      selectSinger
    }
  }
}
</script>

<style lang="scss" scoped>
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
