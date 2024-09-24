import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
];
const router = createRouter({ // tạo một route mới
    history: createWebHistory(import.meta.env.BASE_URL), // lịch sử điều hướng
    routes, // ds các route cũ
});
export default router;