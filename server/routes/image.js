const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');

const userCheck = require('../middlewares/userCheck');
const authCheck = require('../middlewares/authCheck');
const { Good, Comment, Image } = require('../sequelize').models;

const router = new Router();

const deleteFiles = (files) => {
    files.forEach((file) => fs.unlinkSync('uploads/' + file.filename));
};

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

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.startsWith('image/')) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Không phải là ảnh'));
    //     }
    // },
});

const validateRequest = (req, res, next) => {
    const files = req.files;
    const hasCmtImgId = req.body.cmtImgId ? 1 : 0;
    const hasUserImgId = req.body.userImgId ? 1 : 0;
    const hasGoodImgId = req.body.goodImgId ? 1 : 0;

    if (!req.files.length) {
        return res.status(400).json({
            message: 'Không có file nào được upload',
        });
    }

    if (hasCmtImgId + hasUserImgId + hasGoodImgId === 0) {
        deleteFiles(files);
        return res.status(400).json({
            message: 'Phải có 1 trong cmtImgId, userImgId, goodImgId',
        });
    }

    if (hasCmtImgId + hasUserImgId + hasGoodImgId > 1) {
        deleteFiles(files);
        return res.status(400).json({
            message: 'Chỉ được có 1 trong cmtImgId, userImgId, goodImgId',
        });
    }
    next();
};

const handleUserImage = async (req, res, next) => {
    try {
        if (!req.body.userImgId) {
            return next();
        }

        const files = req.files;
        const user = res.locals.user;

        if (user.userId !== +req.body.userImgId) {
            deleteFiles(files);
            return res.status(400).json({
                message: 'Không được cập nhật ảnh của user khác',
            });
        }

        // TODO: Dùng sharp để resize ảnh

        // Xóa ảnh cũ
        const oldAvatar = await user.getAvatar();
        const avatarFile = files[0];

        if (oldAvatar) {
            fs.unlinkSync('uploads/' + oldAvatar.link);
        }

        await user.setAvatar(
            await Image.create({
                link: avatarFile.filename,
            })
        );

        res.status(200).json(await user.getAvatar());
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ handleUserImage',
            errors: error,
        });
    }
};

const handleGoodImages = async (req, res, next) => {
    try {
        if (!req.body.goodImgId) {
            return next();
        }

        const files = req.files;
        const user = res.locals.user;

        const good = await Good.findOne({
            where: {
                goodId: +req.body.goodImgId,
            },
        });

        if (!good) {
            deleteFiles(files);
            return res.status(404).json({
                message: 'Không tìm thấy good',
            });
        }

        if (good.userId !== user.userId) {
            deleteFiles(files);
            return res.status(400).json({
                message: 'Không được tải lên ảnh good của user khác',
            });
        }

        // Xóa các ảnh cũ (có thể thay đổi)
        const oldImages = await good.getImages();
        oldImages.forEach((image) => {
            if (fs.existsSync('uploads/' + image.link)) {
                fs.unlinkSync('uploads/' + image.link);
            }
        });
        await good.removeImages();

        // forEach không thích làm việc với async
        await Promise.all(
            files.map(async (file) => {
                await good.addImage(
                    await Image.create({
                        link: file.filename,
                    })
                );
            })
        );

        res.status(200).json(await good.getImages());
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ handleGoodImages',
            errors: error,
        });
    }
};

const handleCommentImages = async (req, res, next) => {
    try {
        const files = req.files;
        const user = res.locals.user;

        const comment = await Comment.findOne({
            where: {
                commentId: +req.body.cmtImgId,
            },
        });

        if (!comment) {
            deleteFiles(files);
            return res.status(404).json({
                message: 'Không tìm thấy comment',
            });
        }

        if (comment.userId !== user.userId) {
            deleteFiles(files);
            return res.status(400).json({
                message: 'Không được tải lên ảnh comment của user khác',
            });
        }

        // Xóa các ảnh cũ (có thể thay đổi)
        const oldImages = await comment.getImages();
        oldImages.forEach((image) => {
            if (fs.existsSync('uploads/' + image.link)) {
                fs.unlinkSync('uploads/' + image.link);
            }
        });
        await comment.removeImages();

        // forEach không thích làm việc với async
        await Promise.all(
            files.map(async (file) => {
                await comment.addImage(
                    await Image.create({
                        link: file.filename,
                    })
                );
            })
        );

        res.status(200).json(await comment.getImages());
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Lỗi từ handleCommentImages',
            errors: error,
        });
    }
};

router.post(
    '/',
    userCheck,
    authCheck,
    upload.array('formImageFiles', 20),
    validateRequest,
    handleUserImage,
    handleGoodImages,
    handleCommentImages
);

module.exports = router;