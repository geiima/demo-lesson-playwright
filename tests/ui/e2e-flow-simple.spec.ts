import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker'
import { PASSWORD, USERNAME } from '../../config/env-data'

let authPage: LoginPage

test.beforeEach(async ({ page: _page }) => {
  authPage = new LoginPage(_page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login and verify elements on "Order creation" page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.userNameField).toBeVisible()
  await expect(orderCreationPage.phoneNumber).toBeVisible()
  await expect(orderCreationPage.commentField).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeVisible()
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.mainPageLink).toBeVisible()
})

test('login and create order successfully', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.createOrder()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login and verify validation errors during order creation', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.fillOrderFields(
    faker.lorem.word(1), // invalid name
    faker.lorem.word(2), // invalid phone
    faker.lorem.word(), // comment
  )
  await expect(orderCreationPage.userNameError).toBeVisible()
  await expect(orderCreationPage.phoneError).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login and logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logout()
  await expect(authPage.signInButton).toBeVisible()
})
