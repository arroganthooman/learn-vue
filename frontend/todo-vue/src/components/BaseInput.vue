<template>
    <input placeholder="Enter a thing you want to do.." class="base-input" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>

<style scoped>
.base-input {
    width: 400px;
    height: 50px;
    font-family: 'Inter';
    font-size: 1rem;
    padding-left: 20px;
    border-radius: 10px;
    border-color: transparent;
}

</style>