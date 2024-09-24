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
];
const router = createRouter({ // tạo một route mới
    history: createWebHistory(import.meta.env.BASE_URL), // lịch sử điều hướng
    routes, // ds các route cũ
});
export default router;