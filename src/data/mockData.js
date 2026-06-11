// Mock data for the dashboard
export const statsData = {
  totalExpense: 45_200_000,
  totalTuition: 128_500_000,
  totalChildren: 87,
  totalTeachers: 12,
  totalClasses: 6,
  growthRate: 8.4,
  expenseChange: -3.2,
  tuitionChange: 12.1,
  childrenChange: 5.2,
  teachersChange: 0,
  classesChange: 0,
  growthChange: 2.1,
}

export const tuitionChartData = [
  { month: 'T1', tuition: 98_000_000, expense: 42_000_000 },
  { month: 'T2', tuition: 85_000_000, expense: 38_000_000 },
  { month: 'T3', tuition: 102_000_000, expense: 44_000_000 },
  { month: 'T4', tuition: 110_000_000, expense: 46_000_000 },
  { month: 'T5', tuition: 115_000_000, expense: 48_000_000 },
  { month: 'T6', tuition: 108_000_000, expense: 43_000_000 },
  { month: 'T7', tuition: 95_000_000, expense: 40_000_000 },
  { month: 'T8', tuition: 118_000_000, expense: 47_000_000 },
  { month: 'T9', tuition: 122_000_000, expense: 49_000_000 },
  { month: 'T10', tuition: 119_000_000, expense: 46_000_000 },
  { month: 'T11', tuition: 124_000_000, expense: 44_000_000 },
  { month: 'T12', tuition: 128_500_000, expense: 45_200_000 },
]

export const enrollmentChartData = [
  { month: 'T1', enrolled: 5, graduated: 2 },
  { month: 'T2', enrolled: 3, graduated: 1 },
  { month: 'T3', enrolled: 8, graduated: 3 },
  { month: 'T4', enrolled: 6, graduated: 2 },
  { month: 'T5', enrolled: 4, graduated: 4 },
  { month: 'T6', enrolled: 2, graduated: 5 },
  { month: 'T7', enrolled: 7, graduated: 2 },
  { month: 'T8', enrolled: 9, graduated: 1 },
  { month: 'T9', enrolled: 6, graduated: 3 },
  { month: 'T10', enrolled: 5, graduated: 2 },
  { month: 'T11', enrolled: 4, graduated: 3 },
  { month: 'T12', enrolled: 6, graduated: 2 },
]

export const childrenData = [
  { id: 1, name: 'Nguyễn Minh An', dob: '15/03/2021', class: 'Lá 1', parent: 'Nguyễn Văn Bình', phone: '0901234567', tuition: 'Đã đóng', status: 'active' },
  { id: 2, name: 'Trần Thị Bảo', dob: '22/07/2020', class: 'Chồi 2', parent: 'Trần Văn Cường', phone: '0912345678', tuition: 'Chưa đóng', status: 'active' },
  { id: 3, name: 'Lê Quang Minh', dob: '08/11/2021', class: 'Lá 1', parent: 'Lê Thị Dung', phone: '0923456789', tuition: 'Đã đóng', status: 'active' },
  { id: 4, name: 'Phạm Ngọc Hân', dob: '30/01/2022', class: 'Mầm 1', parent: 'Phạm Đức Hùng', phone: '0934567890', tuition: 'Đã đóng', status: 'active' },
  { id: 5, name: 'Hoàng Anh Khoa', dob: '12/05/2020', class: 'Chồi 1', parent: 'Hoàng Thị Lan', phone: '0945678901', tuition: 'Trễ hạn', status: 'warning' },
  { id: 6, name: 'Vũ Thu Hương', dob: '03/09/2021', class: 'Lá 2', parent: 'Vũ Mạnh Tuấn', phone: '0956789012', tuition: 'Đã đóng', status: 'active' },
  { id: 7, name: 'Đặng Hữu Phúc', dob: '19/12/2021', class: 'Lá 2', parent: 'Đặng Thị Mai', phone: '0967890123', tuition: 'Chưa đóng', status: 'inactive' },
  { id: 8, name: 'Bùi Khánh Linh', dob: '27/04/2022', class: 'Mầm 2', parent: 'Bùi Văn Nam', phone: '0978901234', tuition: 'Đã đóng', status: 'active' },
  { id: 9, name: 'Ngô Thái Sơn', dob: '14/08/2020', class: 'Chồi 1', parent: 'Ngô Thị Oanh', phone: '0989012345', tuition: 'Đã đóng', status: 'active' },
  { id: 10, name: 'Đinh Thùy Trang', dob: '06/02/2021', class: 'Lá 1', parent: 'Đinh Văn Phú', phone: '0990123456', tuition: 'Đã đóng', status: 'active' },
  { id: 11, name: 'Cao Nhật Quang', dob: '23/06/2022', class: 'Mầm 1', parent: 'Cao Thị Quỳnh', phone: '0901234568', tuition: 'Trễ hạn', status: 'warning' },
  { id: 12, name: 'Trịnh Mỹ Linh', dob: '11/10/2020', class: 'Chồi 2', parent: 'Trịnh Văn Sang', phone: '0912345679', tuition: 'Đã đóng', status: 'active' },
]

export const teachersData = [
  { id: 1, name: 'Nguyễn Thị Hoa', subject: 'Giáo viên chủ nhiệm', class: 'Lá 1', experience: '8 năm', phone: '0901111111', email: 'hoa.nt@hongphuc.edu.vn', status: 'active' },
  { id: 2, name: 'Trần Thị Lan', subject: 'Giáo viên chủ nhiệm', class: 'Lá 2', experience: '5 năm', phone: '0902222222', email: 'lan.tt@hongphuc.edu.vn', status: 'active' },
  { id: 3, name: 'Lê Thị Mai', subject: 'Giáo viên chủ nhiệm', class: 'Chồi 1', experience: '6 năm', phone: '0903333333', email: 'mai.lt@hongphuc.edu.vn', status: 'active' },
  { id: 4, name: 'Phạm Thị Ngân', subject: 'Giáo viên chủ nhiệm', class: 'Chồi 2', experience: '3 năm', phone: '0904444444', email: 'ngan.pt@hongphuc.edu.vn', status: 'active' },
  { id: 5, name: 'Hoàng Thị Oanh', subject: 'Giáo viên chủ nhiệm', class: 'Mầm 1', experience: '10 năm', phone: '0905555555', email: 'oanh.ht@hongphuc.edu.vn', status: 'active' },
  { id: 6, name: 'Vũ Thị Phượng', subject: 'Giáo viên chủ nhiệm', class: 'Mầm 2', experience: '7 năm', phone: '0906666666', email: 'phuong.vt@hongphuc.edu.vn', status: 'active' },
  { id: 7, name: 'Đặng Thị Quỳnh', subject: 'Giáo viên âm nhạc', class: 'Tất cả', experience: '4 năm', phone: '0907777777', email: 'quynh.dt@hongphuc.edu.vn', status: 'active' },
  { id: 8, name: 'Bùi Thị Thanh', subject: 'Giáo viên thể dục', class: 'Tất cả', experience: '2 năm', phone: '0908888888', email: 'thanh.bt@hongphuc.edu.vn', status: 'active' },
  { id: 9, name: 'Ngô Thị Uyên', subject: 'Nhân viên y tế', class: 'Tất cả', experience: '5 năm', phone: '0909999999', email: 'uyen.nt@hongphuc.edu.vn', status: 'active' },
  { id: 10, name: 'Đinh Thị Vân', subject: 'Nhân viên bếp', class: 'N/A', experience: '3 năm', phone: '0910000000', email: 'van.dt@hongphuc.edu.vn', status: 'active' },
  { id: 11, name: 'Cao Thị Xuân', subject: 'Trợ giảng', class: 'Lá 1', experience: '1 năm', phone: '0911111112', email: 'xuan.ct@hongphuc.edu.vn', status: 'active' },
  { id: 12, name: 'Trịnh Thị Yến', subject: 'Trợ giảng', class: 'Chồi 2', experience: '2 năm', phone: '0912222223', email: 'yen.tt@hongphuc.edu.vn', status: 'leave' },
]

export const notifications = [
  { id: 1, title: 'Học phí tháng 12 chưa thu', desc: '5 học sinh chưa đóng học phí', time: '5 phút trước', read: false, type: 'warning' },
  { id: 2, title: 'Bé Nguyễn Minh An nghỉ ốm', desc: 'Phụ huynh báo bé nghỉ hôm nay', time: '30 phút trước', read: false, type: 'info' },
  { id: 3, title: 'Lương tháng 12 đã chuyển', desc: 'Đã thanh toán lương cho 12 nhân viên', time: '2 giờ trước', read: true, type: 'success' },
  { id: 4, title: 'Sự kiện Tất Niên 2025', desc: 'Nhắc nhở chuẩn bị sự kiện cuối năm', time: '1 ngày trước', read: true, type: 'info' },
]

export const classesData = [
  { id: 1, name: 'Lá 1', teacher: 'Nguyễn Thị Hoa', students: 15, capacity: 20, age: '4-5 tuổi', room: 'Phòng 101' },
  { id: 2, name: 'Lá 2', teacher: 'Trần Thị Lan', students: 14, capacity: 20, age: '4-5 tuổi', room: 'Phòng 102' },
  { id: 3, name: 'Chồi 1', teacher: 'Lê Thị Mai', students: 16, capacity: 20, age: '3-4 tuổi', room: 'Phòng 201' },
  { id: 4, name: 'Chồi 2', teacher: 'Phạm Thị Ngân', students: 15, capacity: 20, age: '3-4 tuổi', room: 'Phòng 202' },
  { id: 5, name: 'Mầm 1', teacher: 'Hoàng Thị Oanh', students: 14, capacity: 18, age: '2-3 tuổi', room: 'Phòng 301' },
  { id: 6, name: 'Mầm 2', teacher: 'Vũ Thị Phượng', students: 13, capacity: 18, age: '2-3 tuổi', room: 'Phòng 302' },
]

export const parentsData = [
  { id: 1, name: 'Nguyễn Văn Bình', phone: '0901234567', email: 'binh.nv@gmail.com', children: 'Nguyễn Minh An', address: '12 Lê Lợi, Q1', status: 'active' },
  { id: 2, name: 'Trần Văn Cường', phone: '0912345678', email: 'cuong.tv@gmail.com', children: 'Trần Thị Bảo', address: '34 Nguyễn Huệ, Q1', status: 'active' },
  { id: 3, name: 'Lê Thị Dung', phone: '0923456789', email: 'dung.lt@gmail.com', children: 'Lê Quang Minh', address: '56 Hai Bà Trưng, Q3', status: 'active' },
  { id: 4, name: 'Phạm Đức Hùng', phone: '0934567890', email: 'hung.pd@gmail.com', children: 'Phạm Ngọc Hân', address: '78 Nam Kỳ Khởi Nghĩa, Q3', status: 'active' },
  { id: 5, name: 'Hoàng Thị Lan', phone: '0945678901', email: 'lan.ht@gmail.com', children: 'Hoàng Anh Khoa', address: '90 Đinh Tiên Hoàng, Bình Thạnh', status: 'warning' },
  { id: 6, name: 'Vũ Mạnh Tuấn', phone: '0956789012', email: 'tuan.vm@gmail.com', children: 'Vũ Thu Hương', address: '102 Phan Xích Long, Phú Nhuận', status: 'active' },
  { id: 7, name: 'Đặng Thị Mai', phone: '0967890123', email: 'mai.dt@gmail.com', children: 'Đặng Hữu Phúc', address: '24 Trần Hưng Đạo, Q5', status: 'inactive' },
  { id: 8, name: 'Bùi Văn Nam', phone: '0978901234', email: 'nam.bv@gmail.com', children: 'Bùi Khánh Linh', address: '46 Cách Mạng Tháng 8, Q10', status: 'active' },
]
