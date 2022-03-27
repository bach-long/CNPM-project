const { Router } = require('express');
const multer = require('multer');
const Image = require('../models/Image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, filename + '-' + file.originalname);
    },
});

const router = new Router();
const upload = multer({ storage: storage });

const handleImageUpload = async (req, res, next) => {
    try {
        //nhận dữ liệu từ form
        const { file } = req;
        const cmtImgId = req.body.cmtImgId ? req.body.cmtImgId : null;
        const userImgId = req.body.userImgId ? req.body.userImgId : null;
        const goodImgId = req.body.goodImgId ? req.body.goodImgId : null;

        // Kiểm tra nếu không phải dạng file thì báo lỗi
        if (!file) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }

        // 127.0.0.1:5000/fileName.png
        fileName = req.file.filename;

        const image = await Image.create({
            link: fileName,
            cmtImgId,
            goodImgId,
            userImgId,
        });

        res.status(200).json(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ HandleImageUpload',
            errors: error,
        });
    }
};

router.post('/', upload.single('formFile'), handleImageUpload);

module.exports = router;
