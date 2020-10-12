const fs = require('fs');
const path = require('path');

class Common {
  static async uploadFile (ctx) {
    const file = ctx.request.files.file;
    const fileDir = path.join(__dirname, '../', '/assets/images');

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, () => {
        ctx.body = {
          code: 907,
          message: '上传失败',
          data: null
        };
      });
    }

    const filename = `${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(fileDir, filename);
    const render = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    
    render.pipe(writer);

    ctx.body = {
      code: 200,
      message: '上传成功',
      data: `${ctx.protocol}://${ctx.host}/images/${filename}`
    };
  }
};

module.exports = Common;