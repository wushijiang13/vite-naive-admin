<template>
    <div class="project">
        <n-data-table
                :data="data"
                :columns="columns"
                :single-line="false"
                :pagination="pagination"
                :max-height="450"
        />
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    const checkedRowKeysRef = ref([])
    function createCols () {
        return [
            {
                type: 'selection',
                options: [
                    'all',
                    'none',
                    {
                        label: '选中前 2 行',
                        key: 'f2',
                        onSelect: (pageData) => {
                            checkedRowKeysRef.value = pageData
                                .map((row) => row.key)
                                .slice(0, 2)
                        }
                    }
                ],
                disabled (row, index) {
                    return row.name === 'Edward King 3'
                }
            },
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Attrs',
                key: 'attrs',
                children: [
                    {
                        title: 'Attack',
                        key: 'attack',
                        children: [
                            {
                                title: 'Physics Attack',
                                key: 'physicsAttack'
                            },
                            {
                                title: 'Magic Attack',
                                key: 'magicAttack'
                            }
                        ]
                    },
                    {
                        title: 'Defend',
                        key: 'defend'
                    },
                    {
                        title: 'Speed',
                        key: 'speed'
                    }
                ]
            }
        ]
    }

    function createData () {
        return Array.apply(null, { length: 50 }).map((_, i) => {
            return {
                key: i,
                name: `name_${i}`,
                physicsAttack: `physicsAttack_${i}`,
                magicAttack: `magicAttack_${i}`,
                defend: `defend_${i}`,
                speed: `speed_${i}`
            }
        })
    }

    const data = ref(createData());
    const columns= ref(createCols());
    const pagination= ref({
        pageSize: 10
    })
</script>

<style scoped>
.project{
}
</style>