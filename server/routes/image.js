const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
      cb(null, 'uploads') 
    },
    filename: function (req, file, cb) {
      // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
      const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, filename + '-' + file.originalname )
    }
})
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const router = new Router();
const upload = multer({ storage: storage })
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
router.post('/uploadfile', upload.single('formFile'), (req, res, next) => {
    //nhận dữ liệu từ form
    const file = req.file;
    // Kiểm tra nếu không phải dạng file thì báo lỗi
    if (!file) {
        const error = new Error('Upload file again!')
        error.httpStatusCode = 400
        return next(error)
    }
    // file đã được lưu vào thư mục uploads
    // gọi tên file: req.file.filename và render ra màn hình
    //res.sendFile(__dirname + `/uploads/${req.file.filename}`);
})
module.exports = router;