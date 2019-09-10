
export default function parseURL(params) {
  params = (params || window.location.search || window.location.hash).match(/\?(.*?)$/ig)
  
  if(params) {
    params = params[0].replace(/^\?/g, '').replace(/(^|&)(.*?)=(.*?)/g, ',"$2":$3')
    params = JSON.parse(`${params.replace(/^,/, '{')}}`)
 
    // params = params[0].replace(/^\?/g, '').split('&')
    // params = params.map(v => v.replace(/^(.*?)=(.*?)$/ig, '"$1":$2'))
    // params = JSON.parse(`{${params.toString()}}`)
  }

  return params || {}
}