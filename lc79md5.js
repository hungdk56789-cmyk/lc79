const axios = require("axios");

const API = "https://wtxmd52.tele68.com/v1/txmd5/lite-sessions?cp=R&cl=R&pf=web&at=b34913ec451fbc5e8e8446894befe0ea";

async function predict() {
    try {
        const res = await axios.get(API);
        const data = res.data;

        // Lấy phiên mới nhất
        const latest = data.data[0];

        const session = latest.session;
        const md5 = latest.md5;

        // Tính tổng số từ md5 (lấy 6 ký tự đầu)
        let sum = 0;
        for (let i = 0; i < 6; i++) {
            sum += parseInt(md5[i], 16) % 10;
        }

        // Logic tài/xỉu (tự quy ước)
        let result = sum >= 25 ? "tài" : "xỉu";

        // Phiên tiếp theo
        const nextSession = parseInt(session) + 1;

        // Thời gian hiện tại
        const now = new Date();
        const time = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

        // Output giống format bạn yêu cầu
        const output = {
            session: nextSession,
            du_doan: result,
            thoi_gian: time
        };

        console.log(JSON.stringify(output, null, 2));

    } catch (err) {
        console.error("Lỗi:", err.message);
    }
}

predict();