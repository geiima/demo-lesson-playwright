import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly userNameField: Locator
  readonly phoneNumber: Locator
  readonly commentField: Locator
  readonly orderButton: Locator
  readonly mainPageLink: Locator
  readonly orderCreatedButton: Locator
  readonly logoutButton: Locator
  readonly userNameError: Locator
  readonly phoneError: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userNameField = page.getByTestId('username-input')
    this.phoneNumber = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.mainPageLink = page.getByTestId('mainPage-link')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.userNameError = page.getByTestId('username-input-error')
    this.phoneError = page.getByTestId('phone-input-error')
  }

  async createOrder(
    name: string = faker.lorem.word(2),
    phone: string = faker.lorem.word(6),
    comment: string = faker.lorem.word(),
  ) {
    await this.userNameField.fill(name)
    await this.phoneNumber.fill(phone)
    await this.commentField.fill(comment)
    await this.orderButton.click()
  }

  async fillOrderFields(name: string, phone: string, comment: string) {
    await this.userNameField.fill(name)
    await this.phoneNumber.fill(phone)
    await this.commentField.fill(comment)
  }

  async logout() {
    await this.logoutButton.click()
  }
}
