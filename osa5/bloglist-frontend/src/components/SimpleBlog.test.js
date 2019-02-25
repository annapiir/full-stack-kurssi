import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


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

test('pushing like-button twice calls two likes', () => {
  const blog = {
    title: 'Reactin testaus on parasta ikinä',
    author: 'Test Master',
    likes: 1789
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})