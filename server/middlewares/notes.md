user check jwt để hiển thị thông tin của riêng người đang dùng, vd nếu không có jwt thì không hiện, nếu có jwt thì có hiện like bài đăng, lưu user hiện tại vào res.locals

auth đi sau user, nếu có res.locals thì authenticated, dùng trong các route cần đã đăng nhập: like, đăng bài

user: Không đăng nhập hay đăng nhập đều xem được nhưng đăng nhập thì khác không đăng nhập

user, auth: Bắt buộc phải đăng nhập
