# QUY TRÌNH LỒNG TIẾNG AI VÀ DỰNG MASTER AUDIO CHO KỊCH SÂN KHẤU

Tài liệu này ghi lại quy trình chuẩn dành cho Đạo diễn để sản xuất âm thanh (thoại + nhạc + tiếng động) cho vở nhạc kịch Giáng sinh (Canh thức), đảm bảo diễn viên diễn khớp nhịp, không bị "cháy giáo án" hay cuống cuồng theo tiếng nói.

---

## 1. Lưu ý quan trọng về Công cụ (ElevenLabs)

- **Model sử dụng:** Chọn **Eleven v4** (hoặc phiên bản mới nhất hỗ trợ tiếng Việt mượt mà và tự nhiên nhất).
- **Cấu hình Voice Settings (Cảm xúc kịch nghệ):**
  - **Stability (Độ ổn định):** `35% - 40%` (kéo thấp để giọng có độ rung, ngập ngừng, kịch tính, bớt đều đều).
  - **Similarity:** `75%` (giữ đặc trưng giọng nhân vật).
  - **Style Exaggeration:** `20% - 30%` (tăng độ biểu cảm, hỉ nộ ái ố).
- **Mẹo gõ thoại có cảm xúc:**
  - Dùng dấu ba chấm `...` hoặc gạch ngang `-` để AI ngắt nghỉ, lấy hơi, ngập ngừng.
  - Viết HOA các từ cần nhấn mạnh (ví dụ: *"Chẳng chết chóc gì ĐÂU!"*).
  - Thêm từ cảm thán tự nhiên: *"Ôi...", "Hahaha...", "Hức..."*.

---

## 2. Quy trình 5 bước thực hiện (Chuẩn Đạo diễn sân khấu)

### Bước 1: Xuất file thoại theo từng nhân vật (Text to Speech)
Đừng cố ép AI đọc liền một mạch cả cảnh. Hãy xuất riêng từng câu thoại theo từng nhân vật để dễ dàng căn chỉnh nhịp diễn viên:
- **Tạo thư mục âm thanh** trên máy tính: `Canh_2_Sa_Nga/`
- Chọn giọng phù hợp cho từng vai:
  - **CON RẮN:** Giọng nam trầm, thì thầm, xảo quyệt (ví dụ: Callum, George).
  - **EVA:** Giọng nữ trẻ, trong sáng, e ấp (ví dụ: Sarah, Freya).
  - **ADAM:** Giọng nam trung, rụt rè, bối rối (ví dụ: Charlie).
  - **THIÊN CHÚA:** Giọng nam trầm sâu, uy nghiêm, vang rền (ví dụ: Daniel, Brian).
- Xuất từng file và lưu tên có thứ tự, ví dụ:
  - `01_Ran_HoiConNguoi.mp3`
  - `02_Eva_KhongDau.mp3`
  - `03_Ran_ChangChetChocGiDau.mp3`
  - `04_ThienChua_AdamNguoiODau.mp3`
  - `05_Adam_ToiDaNgheTiengNguoi.mp3`
  - `06_ThienChua_AiChoNguoiBiet.mp3`
  - `07_Adam_NguoiDanBa.mp3`
  - `08_ThienChua_TaiSaoNguoiLam.mp3`
  - `09_Eva_ConRanPhinhGat.mp3`
  - `10_ThienChua_LoiRanDoc.mp3`

---

### Bước 2: Tạo "Khoảng lặng kịch nghệ" (Action Pauses)
Sân khấu kịch cần thời gian để diễn viên hành động. Trong kịch bản luôn có những đoạn hành động hình thể:
> *(Eva bối rối nghĩ ngợi rồi quay lại nhón gót hái trái và ăn, rồi đưa cho cả chồng cùng ở đó với mình, ông cũng ăn)*

- **Hành động này ngoài đời mất ít nhất 12 - 18 giây.**
- Khi dựng âm thanh, bạn phải **chừa khoảng trống 12 - 18 giây** giữa câu thoại của Rắn và tiếng gọi của Thiên Chúa.
- Đoạn trống này không để im lặng, mà lót:
  - Tiếng gió rít, tiếng lá cây xào xạc (SFX).
  - Một đoạn nhạc kịch tính, hồi hộp tạo từ Suno AI.

---

### Bước 3: Dựng Timeline trên phần mềm (CapCut Desktop / Audacity / Premiere)
Mở dự án mới và chia làm 3 tầng âm thanh (Audio Tracks):
1. **Track 1 (Voice/Dialogue):** Xếp các file thoại MP3 từ ElevenLabs theo đúng thứ tự kịch bản. Chỉnh khoảng cách giữa các câu cho vừa vặn với bước chân và cử chỉ của diễn viên.
2. **Track 2 (BGM - Nhạc nền):**
   - Đặt các đoạn nhạc không lời (Instrumental) tạo từ Suno AI.
   - Nhạc thiên đàng êm dịu lúc đầu -> Nhạc hồi hộp, căng thẳng lúc Rắn cám dỗ -> Nhạc trầm buồn/uy nghiêm sau khi ăn trái cấm.
3. **Track 3 (SFX - Hiệu ứng âm thanh):**
   - Tiếng rắn trườn xào xạc.
   - Tiếng cắn trái cây rôm rốp.
   - Tiếng sấm chớp / tiếng gió khi Chúa xuất hiện.

---

### Bước 4: Cân bằng âm lượng (Audio Mixing / Ducking)
- **Âm lượng giọng thoại:** Đặt mức cao rõ nét (khoảng `-3dB` đến `0dB`).
- **Âm lượng nhạc nền (BGM):**
  - Lúc nhân vật đang thoại: Kéo nhỏ nhạc xuống `-15dB` đến `-20dB` để giọng nói nghe rõ từng chữ, không bị nhạc nuốt mất.
  - Lúc không có thoại (đoạn chuyển cảnh, đoạn diễn viên múa/hành động): Đẩy nhạc nền lên to (`-6dB` đến `-3dB`) để tạo cảm xúc cao trào.

---

### Bước 5: Xuất Master Track và Tập dượt
- Xuất ra 1 file âm thanh duy nhất cho Cảnh 2: `Canh_2_Master_Audio.mp3`.
- Bật file âm thanh này lên loa và cho diễn viên tập:
  - Diễn viên không cần nói thật to (tránh mệt, tránh khản cổ).
  - Tập trung 100% vào ánh mắt, nét mặt, bước đi và nhép miệng (lip-sync) sao cho khớp tuyệt đối với file âm thanh.
- Nếu chỗ nào diễn viên đi không kịp tiếng nói: Chỉ cần mở lại CapCut và kéo dãn khoảng cách ra thêm vài giây, cực kỳ linh hoạt!
