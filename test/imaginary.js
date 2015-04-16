var Imaginary = require('../')
var expect = require('chai').expect
var nock = require('nock')
var fs = require('fs')

suite('Imaginary', function () {
  test('API', function () {
    expect(Imaginary).to.be.a('function')
  })

  test('VERSION', function () {
    expect(Imaginary.VERSION).to.be.a('string')
  })

  nock('http://server.com')
    .get('/image.jpg')
    .replyWithFile(200, __dirname + '/fixtures/test.jpg')

  nock('http://localhost:8088')
    .persist()
    .filteringPath(function (path) { return '/' })
    .post('/')
    .replyWithFile(200, __dirname + '/fixtures/test.jpg')

  test('remove image', function (done) {
    Imaginary('http://server.com/image.jpg')
      .rotate({ rotate: 90 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#crop', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .crop({ width: 400 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#resize', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .resize({ width: 300 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#thumbnail', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .thumbnail({ width: 300 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#rotate', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .rotate({ rotate: 90 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#extract', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .extract({ top: 100, left: 100, width: 400 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

})
