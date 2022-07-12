<template>
    <div class="wrapper stack mt-2">
        <div id="about-page">Created by {{ autor }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const ComponentName = 'Contacts';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            autor: 'Justus Klopfer',
        };
    },
    components: {},
    methods: {},
});
</script>
<style scoped>
#about-page {
    color: green;
}
</style>
