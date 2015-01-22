#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> [Clickatell](http://www.clickatell.com) API client library for nodejs


## Install

```sh
$ npm install --save node-clickatell
```


## Usage

```js
var clickatell = new Clickatell({
  user : '[Your user]',
  password:'[Your password]',
  api_id : '[Your api ID]'
});

clickatell.sendmsg("message to send",['ToPhoneNumber'],function(res){
  console.log(res); // ID: 4c640d23a882b331563a2a5dcab258a8
});
```


## License

MIT © [ManyRoots](http://www.manyroots.es)


[npm-url]: https://npmjs.org/package/node-clickatell
[npm-image]: https://badge.fury.io/js/node-clickatell.svg
[travis-url]: https://travis-ci.org/Manyroots/node-clickatell
[travis-image]: https://travis-ci.org/Manyroots/node-clickatell.svg?branch=master
[daviddm-url]: https://david-dm.org/Manyroots/node-clickatell.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/Manyroots/node-clickatell
