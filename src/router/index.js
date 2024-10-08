import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },

    {
        path: "/:pathMatch(.*)*", //pathMatch(.*)* sử dụng cú pháp của vue-router để khớp mọi đường dẫn không xác định, 
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/contacts/",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
    }
];
const router = createRouter({ // tạo một route mới
    history: createWebHistory(import.meta.env.BASE_URL), // lịch sử điều hướng
    routes, // ds các route cũ
});
export default router;