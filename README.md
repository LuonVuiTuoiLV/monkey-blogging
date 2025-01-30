Monkey Blogging
Monkey Blogging là một nền tảng blog được phát triển bằng React.js và Firebase, nhằm mục đích học tập và thực hành.

Mục Lục
Giới thiệu
Tính năng
Cài đặt
Sử dụng
Đóng góp
Giấy phép
Giới thiệu
Monkey Blogging được tạo ra để cung cấp một nền tảng blog đơn giản, nơi người dùng có thể tạo, chỉnh sửa và xóa bài viết. Dự án này được xây dựng với mục đích học tập, giúp các nhà phát triển thực hành React.js và tích hợp với Firebase.

Tính năng
Đăng ký và đăng nhập người dùng
Tạo, chỉnh sửa và xóa bài viết
Hiển thị danh sách bài viết
Tìm kiếm bài viết theo tiêu đề hoặc nội dung
Bình luận và đánh giá bài viết
Cài đặt
Để cài đặt và chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

Clone kho lưu trữ:

bash
Copy
Edit
git clone https://github.com/LuonVuiTuoiLV/monkey-blogging.git
cd monkey-blogging
Cài đặt các phụ thuộc:

bash
Copy
Edit
npm install
Cấu hình Firebase:

Tạo một dự án trên Firebase.

Thiết lập ứng dụng web và lấy cấu hình Firebase.

Tạo tệp .env trong thư mục gốc của dự án và thêm các biến môi trường sau:

makefile
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Chạy ứng dụng:

bash
Copy
Edit
npm start
Ứng dụng sẽ chạy tại http://localhost:3000.

Sử dụng
Đăng ký/Đăng nhập: Người dùng có thể tạo tài khoản mới hoặc đăng nhập bằng tài khoản hiện có.
Tạo bài viết: Sau khi đăng nhập, người dùng có thể tạo bài viết mới bằng cách nhấn vào nút "Tạo bài viết".
Chỉnh sửa/Xóa bài viết: Người dùng có thể chỉnh sửa hoặc xóa bài viết của mình.
Tìm kiếm: Sử dụng thanh tìm kiếm để tìm bài viết theo tiêu đề hoặc nội dung.
Đóng góp
Chúng tôi hoan nghênh các đóng góp từ cộng đồng. Để đóng góp, hãy:

Fork dự án.
Tạo một nhánh mới (git checkout -b feature/YourFeature).
Commit các thay đổi (git commit -m 'Thêm tính năng ABC').
Push lên nhánh (git push origin feature/YourFeature).
Tạo một Pull Request.
Giấy phép
Dự án này được cấp phép theo giấy phép MIT. Xem tệp LICENSE để biết thêm chi tiết.

