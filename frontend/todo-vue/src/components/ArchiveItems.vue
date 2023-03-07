<template>
    <div class="archive-items">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['message', 'id'],
}
</script>

<style scoped>
.archive-items {
    border-radius: 10px;
    background-color: white;
    color: black;
    display: flex;
    padding: 10px;
    align-items: center;
    font-size: 1.25rem;
}
</style>