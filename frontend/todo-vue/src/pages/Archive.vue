<template>
    <h1>Archive</h1>
    <div class="archive-container">
        <div class="archive">
            <ArchiveItems v-for="archive in archives" :message="archive.todoMessage" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArchiveItems from '../components/ArchiveItems.vue'

export default {
    components: {
        ArchiveItems
    },
    computed: {
        ...mapGetters({
            archives: 'getArchives'
        })
    },
    mounted() {
        this.$store.dispatch('fetchArchived')
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    color: black;
    padding: 40px 0 0 0;
}

.archive-container {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin-top: 20px;
}

.archive {
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 30px;
    row-gap: 30px;
    background-color: #93BFCF;
    width: 85%;
    border-radius: 10px;
    padding: 20px 20px;
}

</style>