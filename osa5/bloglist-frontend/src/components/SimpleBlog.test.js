import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


afterEach(cleanup)

test('renders title', () => {
  const blog = {
    title: 'Reactin testaus on parasta ikinä',
    author: 'Test Master',
    likes: 1789
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'Reactin testaus on parasta ikinä'
  )
})

test('renders author', () => {
  const blog = {
    title: 'Reactin testaus on parasta ikinä',
    author: 'Test Master',
    likes: 1789
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'Test Master'
  )
})

test('renders author', () => {
  const blog = {
    title: 'Reactin testaus on parasta ikinä',
    author: 'Test Master',
    likes: 1789
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    '1789'
  )
})