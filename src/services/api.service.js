import axios from "axios"; //Axios là một thư viện HTTP client phổ biến cho JavaScript, được sử dụng để thực hiện các yêu cầu HTTP như GET, POST, PUT, DELETE, v.v.
const commonConfig = {
    headers: {
        "Content-Type": "application/json", // nội dung của yêu cầu sẽ ở định dạng JSON
        Accept: "application/json", //client mong muốn nhận dữ liệu trả về ở định dạng JSON
    },
};
export default (baseURL) => { //default ho phép các module khác nhập và sử dụng hàm này mà không cần phải đặt tên cụ thể
    return axios.create({
        baseURL,
        ...commonConfig, // toán tử ... để nở rộng các thuộc tính từ commonConfig
    });
};