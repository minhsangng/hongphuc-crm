# Hong Phuc Kindergarten Management System

Hệ thống quản lý Hong Phuc Kindergarten là một ứng dụng web được xây dựng nhằm hỗ trợ số hóa và quản lý các hoạt động nghiệp vụ của trường mầm non.

Dự án được phát triển bởi một Independent Developer, sử dụng ReactJS và Vite cho Front-end, NodeJS cho Back-end và hệ thống cơ sở dữ liệu Neon/PostgresServerless phục vụ việc lưu trữ và xử lý dữ liệu.

---

## 1. Giới thiệu

Hong Phuc Kindergarten Management System được xây dựng với mục tiêu cung cấp một nền tảng quản lý tập trung, giúp nhà trường quản lý dữ liệu một cách thống nhất, thuận tiện và hiệu quả.

Hệ thống được thiết kế theo kiến trúc Front-end và Back-end tách biệt:

- Front-end được xây dựng bằng ReactJS và Vite.
- Back-end được xây dựng bằng NodeJS.
- Front-end giao tiếp với Back-end thông qua REST API.
- Back-end chịu trách nhiệm xử lý nghiệp vụ, xác thực, phân quyền và truy xuất dữ liệu.
- Database được sử dụng để lưu trữ dữ liệu của hệ thống.

Kiến trúc này giúp hệ thống dễ dàng bảo trì, mở rộng và phát triển thêm các chức năng trong tương lai.

---

## 2. Mục tiêu dự án

Dự án hướng đến các mục tiêu chính:

- Số hóa quy trình quản lý của nhà trường.
- Tập trung dữ liệu vào một hệ thống thống nhất.
- Giảm thiểu việc quản lý dữ liệu thủ công.
- Hỗ trợ quản lý thông tin trẻ, giáo viên, nhân viên và lớp học.
- Hỗ trợ tra cứu và thống kê dữ liệu nhanh chóng.
- Cung cấp hệ thống phân quyền nhằm kiểm soát quyền truy cập.
- Xây dựng nền tảng có khả năng mở rộng trong tương lai.

---

## 3. Tính năng

### 3.1. Quản lý trẻ

Hệ thống hỗ trợ quản lý thông tin của trẻ, bao gồm:

- Thông tin cá nhân.
- Thông tin phụ huynh hoặc người giám hộ.
- Thông tin liên hệ.
- Thông tin lớp học.
- Trạng thái học tập.
- Các thông tin liên quan đến quá trình học tập tại trường.

### 3.2. Quản lý giáo viên

Các chức năng quản lý giáo viên bao gồm:

- Thêm, sửa và xóa thông tin giáo viên.
- Quản lý thông tin cá nhân.
- Quản lý thông tin liên hệ.
- Phân công giáo viên cho lớp.
- Theo dõi thông tin công việc.

### 3.3. Quản lý nhân viên

Hệ thống hỗ trợ quản lý thông tin nhân viên của trường:

- Thông tin cá nhân.
- Thông tin liên hệ.
- Vị trí công việc.
- Bộ phận.
- Trạng thái làm việc.

### 3.4. Quản lý lớp học

Các chức năng liên quan đến lớp học:

- Tạo và quản lý lớp học.
- Quản lý danh sách trẻ trong lớp.
- Quản lý giáo viên phụ trách.
- Theo dõi thông tin lớp.
- Phân lớp cho trẻ.
- Quản lý lớp theo từng năm học.

### 3.5. Quản lý năm học

Hệ thống hỗ trợ quản lý dữ liệu theo từng năm học:

- Tạo năm học.
- Thiết lập năm học hiện tại.
- Quản lý lớp theo năm học.
- Quản lý danh sách trẻ theo năm học.
- Theo dõi dữ liệu theo từng giai đoạn.

### 3.6. Quản lý phụ huynh

Hệ thống có thể quản lý thông tin phụ huynh hoặc người giám hộ:

- Thông tin cá nhân.
- Thông tin liên hệ.
- Quan hệ với trẻ.
- Thông tin liên quan đến trẻ đang theo học.

### 3.7. Dashboard

Dashboard cung cấp giao diện tổng quan về tình trạng hoạt động của hệ thống.

Các thông tin có thể bao gồm:

- Tổng số trẻ.
- Tổng số giáo viên.
- Tổng số nhân viên.
- Tổng số lớp học.
- Thống kê theo năm học.
- Các thông tin tổng hợp khác phục vụ công tác quản lý.

### 3.8. Xác thực và phân quyền

Hệ thống hỗ trợ các chức năng liên quan đến tài khoản:

- Đăng nhập.
- Đăng xuất.
- Xác thực người dùng.
- Quản lý phiên đăng nhập.
- Phân quyền theo vai trò.
- Kiểm soát quyền truy cập API.
- Bảo vệ các chức năng yêu cầu xác thực.

Danh sách quyền thực tế phụ thuộc vào cấu hình của từng phiên bản hệ thống.

---

## 4. Công nghệ sử dụng

### Front-end

| Công nghệ | Mục đích |
|---|---|
| ReactJS | Xây dựng giao diện người dùng |
| Vite | Development server và build tool |
| JavaScript / TypeScript | Ngôn ngữ lập trình |
| HTML5 | Xây dựng cấu trúc giao diện |
| CSS3 | Thiết kế và định dạng giao diện |
| REST API | Giao tiếp với Back-end |

### Back-end

| Công nghệ | Mục đích |
|---|---|
| NodeJS | Runtime cho Back-end |
| JavaScript / TypeScript | Phát triển Back-end |
| REST API | Cung cấp API cho Front-end |
| Database | Lưu trữ dữ liệu |

Các thư viện và package được sử dụng trong dự án được quản lý thông qua `package.json`.

---

## 5. Kiến trúc hệ thống

Hệ thống được tổ chức theo mô hình Front-end / Back-end:

```text
+----------------------+
|        User          |
+----------+-----------+
           |
           v
+----------------------+
|   ReactJS + Vite     |
|      Front-end       |
+----------+-----------+
           |
           | HTTP / REST API
           v
+----------------------+
|        NodeJS        |
|       Back-end       |
+----------+-----------+
           |
           v
+----------------------+
|       Database       |
+----------------------+
