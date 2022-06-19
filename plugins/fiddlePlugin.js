function docsifyJsFiddle (hook, vm) {
  hook.doneEach(function () {
    
  })
}

window.$docsify = window.$docsify || {}
window.$docsify.plugins = [docsifyJsFiddle].concat(window.$docsify.plugins || [])