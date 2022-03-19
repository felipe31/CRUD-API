'use strict'
const fetch = require('cross-fetch')

async function  insert(module, body) {
  const path = module + "/create"
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const responseBody = await response.json()
  expect(responseBody.error).toBeUndefined()

  for (var key in body) {
    expect(responseBody[key]).toBe(body[key])
  }
  expect(response.status).toBe(201)
}

async function update(module, body, expectations) {
  const path = module + "/update"
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/${path}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const responseBody = await response.json()
  expect(responseBody.error).toBeUndefined()

  for (var key in expectations) {
    expect(responseBody[key]).toBe(expectations[key])
  }

  expect(response.status).toBe(200)
}

async function get(module, expectations) {
  const path = module
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/${path}`)
  const responseBody = await response.json()
  expect(responseBody.error).toBeUndefined()
  expect(responseBody.length).toBe(expectations.length)
  for (var i = 0; i < responseBody.length; ++i) {
    for (var key in expectations) {
      expect(responseBody[i][key]).toBe(expectations[i][key])
    }
  }

  expect(response.status).toBe(200)
}

async function remove(module, body) {
  const path = module + "/delete"
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/${path}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const responseBody = await response.json()
  expect(responseBody.error).toBeUndefined()
  for (var key in body) {
    expect(responseBody[key]).toBe(body[key])
  }
  expect(response.status).toBe(201)

}
module.exports = {insert, update, get, remove}