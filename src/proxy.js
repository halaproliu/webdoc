const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        console.log(target, prop)
        let o = Reflect.get(target, prop);
        console.log(o)
        if (typeof o === 'function') {
            return o.bind(target)
        }
        if (typeof prop !== 'string') {
            return o;
        }
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        target = new URL(target);
        console.log(target)
        target.hostname += `.${prop}`;
        console.log(target)
        console.log('===========================')
        return new Proxy(target, { get });
    }
});

www.baidu.com.then(response => {
  console.log(response.status);
  // ==> 200
})

function get (num) {
  var ans = num
  function minus (a) {
    return get(num - a)
  }
  function plus (a) {
    return get(num + a)
  }
  function result () {
    return ans
  }

  return {
    minus,
    plus,
    result
  }
}

var a = get(1).minus(2).plus(3).result()
console.log(a)

let x = {
  a: 1
}

let y = {
  b: 1
}
let person = new Proxy(x, {
  set: function (target, prop, value, receiver) {
    let res = Reflect.set(target, prop, value, receiver)
    return res
  }
})

person.a = 2
console.log(person)