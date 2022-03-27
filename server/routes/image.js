const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Img = require('../models/Image');
const sharp = require('sharp');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, filename + '-' + file.originalname);
    },
});

//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const router = new Router();
const upload = multer({ storage: storage });

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.post('/', upload.single('formFile'),async (req, res, next) => {
    //nhận dữ liệu từ form
    const file = req.file;
    // Kiểm tra nếu không phải dạng file thì báo lỗi
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
    }
    sharp(req.file.path).resize(262, 317).toFile('./uploads/'+ '262x317-'+req.file.filename, function(err) {
        if (err) {
            console.error('sharp>>>', err)
        }
        console.log('ok okoko')
    })
    // file đã được lưu vào thư mục uploads
    // gọi tên file: req.file.filename và render ra màn hình
    //res.sendFile(__dirname + `/uploads/${req.file.filename}`);
    try {
        // TODO: Validate và ném lỗi đọc được
        link = req.file.path;
        cmtImgId = req.cmtImgId ? null : req.cmtImgId;
        goodImgId = req.goodImgId ? null : req.goodImgId;
        userImgId = req.userImgId ? null : req.userImgId;
        // create good
        const good = await Img.create({
            link,
            cmtImgId,
            goodImgId,
            userImgId,
        });

        // console.log(await good.getUser()); // works
        // console.log(await user.getGoods()); // works

        res.status(200).json(good);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'can not create Img',
            errors: error,
        });
    }
});

module.exports = router;