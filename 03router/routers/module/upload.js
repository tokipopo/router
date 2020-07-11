const multer = require('multer')
const express = require('express');
const Router = express.Router();
const { host } = require('../../config.json');
let query = require('../../db/mysql');

var storage = multer.diskStorage({
    destination:'uploads/',
    filename:function(req,file,cb){
        let filename = file.originalname;
        let arr = filename.split('.');
        cb(null,arr[0]+'-'+Date.now()+'.'+arr[1]);
    }
})

var upload = multer({storage:storage});


// 上传头像
Router.post('/headphoto/:id',upload.single('avatar'),async(req,res)  =>{
    let url = host + '/uploads/' + req.file.filename;
    let {id}=req.params;
    let sql = `UPDATE user SET avatar='${url}' WHERE id=${id}`;
    let data = await query(sql);
    if(data.affectedRows){
        inf ={
            code: 2000,
            flag: true,
            message: '上传成功'
        }
    }else{
        inf ={
            code:3000,
            flag:false,
            message:"upload failuer"
        }
    }
    res.send(inf);
})

// 上传多张
Router.post('/goodimg/:id', upload.array('photos', 3), async (req, res) => {
    let urlList = [];
    let {id}=req.params;
    req.files.forEach(item => {
        let url = host + '/uploads/' + item.filename;
        urlList.push(url);
    });
    let sql = `UPDATE goods SET userlist='${urlList}' WHERE good_id=${id}`;
    let data = await query(sql);
    let inf = {};
    if (data.affectedRows) {
        //上传成功
        inf = {
            code: 2000,
            flag: true,
            message: '上传成功'

        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '上传失败'
        }
    }
    res.send(inf);
})


module.exports = Router;