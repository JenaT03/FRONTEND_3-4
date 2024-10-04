<template>
    <div class="page row">
        <div class="col-md-10">
            <!-- Khi người dùng nhập văn bản vào thanh tìm kiếm, giá trị này được cập nhật vào searchText -->
            <InputSearch v-model="searchText" /> 
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>

            <ContactList
            v-if="filteredContactsCount > 0"
            :contacts="filteredContacts"
            v-model:activeIndex="activeIndex"
            /> 
            <!-- v-model:activeIndex="activeIndex" Đồng bộ hóa dữ liệu cho chỉ số của liên hệ đang được chọn. -->
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> 
                    Làm mới
                </button>
           
                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> 
                    Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> 
                    Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <!-- Nếu activeContact tồn tại (liên hệ được chọn), chi tiết sẽ hiển thị. -->
            <div v-if="activeContact"> 
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact" />
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact._id },
                    }"
                    >
                    <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import ContactCard from "@/components/ContactCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import ContactList from "@/components/ContactList.vue";
    import ContactService from "@/services/contact.service";
    export default {
        components: {
            ContactCard,
            InputSearch,
            ContactList,
        },
        data() {
            return {
                contacts: [],
                activeIndex: -1,
                searchText: "",
            };
        },
        //Khi giá trị này thay đổi, chỉ số của liên hệ đang chọn (activeIndex) sẽ bị đặt lại thành -1, tức là bỏ chọn.
        watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
                this.activeIndex = -1;
            },
        },
        computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
            contactStrings() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
                });
            },
            // Trả về các contact có chứa thông tin cần tìm kiếm.
            filteredContacts() {
                if (!this.searchText) return this.contacts;
                return this.contacts.filter((_contact, index) => this.contactStrings[index].includes(this.searchText));
            },
            activeContact() {
                if (this.activeIndex < 0) return null;
                return this.filteredContacts[this.activeIndex];
            },
            filteredContactsCount() {
               
                return this.filteredContacts.length;
            },
        },

        methods: {
            async retrieveContacts() {
                try {
                    this.contacts = await ContactService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveContacts();
                this.activeIndex = -1;
            },
            async removeAllContacts() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await ContactService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddContact() {
                this.$router.push({ name: "contact.add" });
            },

        },
        //Khi component được khởi tạo, gọi phương thức refreshList() để tải danh sách liên hệ ban đầu
        mounted() {
            this.refreshList();
        },
   };
</script>
<style scoped>
    .page {
        text-align: left;
        max-width: 750px;
    }
</style>