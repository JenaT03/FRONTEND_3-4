<script>
    export default {
        props: {
            modelValue: { type: String, default: "" }, // prop nhận dữ liệu từ component cha. Prop này có kiểu dữ liệu là String, và mặc định là một chuỗi rỗng ""
        },
        emits: ["submit", "update:modelValue"], // sự kiện submit và sự kiện update:modelValue 
        methods: {
            updateModelValue(e) {
                this.$emit("update:modelValue", e.target.value); // khi thay đổi value của input nó sẽ emit sự kiện update:modelValue và giá trị e.target.value giúp cập nhật giá trị cho modelValue ở component cha.
            },
            submit() {
                this.$emit("submit");
            },                              
        },
    };
</script>

<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm"         
        :value="modelValue" @input="updateModelValue" @keyup.enter="submit"/> <!-- Giá trị của ô nhập liệu được lấy từ prop, khi nhập gọi method updateModelValue, khi enter gọi method submit -->
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit"> <!-- Khi click gọi method submit -->
                <i class="fas fa-search"></i> 
                Tìm kiếm
            </button>
        </div>
    </div>
</template>