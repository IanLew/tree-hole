function parse(url) {
  return (url || document.location.search || document.location.hash).match(/\?(.*?)$/ig)
}

function match(path) {
  return path ? (new RegExp(`${path}$`, 'ig')).test(document.location) : false
}

export function getParamsByReg(url) {
  let params = parse(url)

  if(params) {
    params = params[0].replace(/^\?/g, '').replace(/(^|&)(.*?)=(.*?)/g, ',"$2":$3')
    params = JSON.parse(`${params.replace(/^,/, '{')}}`)
  }

  return params || {}
}

export function getParamsByMap(url) {
  let params = parse(url)

  if(params) {
    params = params[0].replace(/^\?/g, '').split('&')
    params = params.map(v => v.replace(/^(.*?)=(.*?)$/ig, '"$1":$2'))
    params = JSON.parse(`{${params.toString()}}`)
  }
}

export function getPathIndex() {
  return ['/', '/chat', '', '/mail', '/centre'].findIndex(v => match(v)) || 0
}