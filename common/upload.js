const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')
const shortUuid = require('short-uuid')

class Upload {
  static async singleImage(ctx) {
    const file = ctx.request.files.image
    const suffix = file.name.replace(/.*\.(\w+$)/g, '$1')

    if (['jpg', 'jpeg', 'png'].includes(suffix)) {
      try {
        let dir = path.join(__dirname, '../', 'uploads')
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir)
        }
        dir = path.join(dir, 'images')
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir)
        }
        const fileStream = await fsPromises.readFile(file.path)
        const fileName = `${shortUuid.generate()}.${suffix}`
        await fsPromises.writeFile(`${dir}/${fileName}`, fileStream)
        ctx.body = {
          code: 200,
          message: '上传成功',
          data: `${ctx.protocol}://${ctx.host}/images/${fileName}`
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '上传失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: `不支持${suffix}格式`,
        data: null
      }
    }
  }
}

module.exports = Upload
