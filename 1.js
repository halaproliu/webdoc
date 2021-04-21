url = 'https://sample.com'

try {
  asyncAjaxGet(url, (response) => {
    response.data.children = 1; // 可能有异常，期望被捕获
  })
} catch(e) {
  console.log('a:', e)
}

function asyncAjaxGet(url, fn) {
    fn()
}
