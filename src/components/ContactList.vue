<script>
    export default {
        props: {
            contacts: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index); // emit sự kiện "update:activeIndex" và truyền chỉ số index của liên hệ đó để thông báo cho component cha rằng liên hệ này đã được chọn.
            }
        }
    };
</script>
<template>
    <ul class="list-group">
        <!-- Nếu chỉ số của liên hệ hiện tại (index) trùng với giá trị của activeIndex, thì mục này sẽ có thêm lớp active -->
        <li class="list-group-item"
        v-for="(contact, index) in contacts"
        :key="contact._id" 
        :class="{ active: index === activeIndex }" 
        @click="updateActiveIndex(index)"
        >
            {{ contact.name }}
        </li>
    </ul>
</template>