/* eslint-disable max-len */
'use strict';

const body = document.querySelector('body');
const openForm = document.querySelector('.form__section-open');
const closeForm = document.querySelector('.form__block-cross');
const form = document.querySelector('.form__block');
const submit = document.querySelector('.form__block-button');
const userName = document.querySelector('#name');
const user = document.querySelector('#user');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const notificationBlock = document.querySelector('.notification');
const startNotification = document.querySelector('.notification__message');

const validationEmail = /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const validationName = /[a-zA-Z]/;
const validationUser = /[a-zA-Z]/;
// eslint-disable-next-line no-useless-escape
const validationPhone = /^[\d\+][\d\(\)\ -]{8,13}\d$/;

openForm.addEventListener('click', (event) => {
  event.preventDefault();
  startNotification.classList.toggle('notification__message-start--hide');
  form.classList.remove('hide-form', 'hide-form-start');
  form.classList.add('open-form');
  openForm.classList.remove('open');
  openForm.classList.add('hide');
});

closeForm.addEventListener('click', (event) => {
  event.preventDefault();
  form.classList.remove('open-form');
  form.classList.add('hide-form');
  openForm.classList.remove('hide');
  openForm.classList.add('open');
});

const notification = document.createElement('div');

submit.addEventListener('click', (event) => {
  event.preventDefault();

  if (userName.value.length < 2
    || email.value.length < 2
    || user.value.length < 2
    || phone.value.length < 2) {
    createNotification('error');
    notificationBlock.classList.toggle('notification__error');

    return;
  }

  if (!validationName.test(userName.value)) {
    createNotification('name');
    notificationBlock.classList.toggle('notification__error');

    return;
  } else if (!validationUser.test(user.value)) {
    createNotification('user');
    notificationBlock.classList.toggle('notification__error');

    return;
  } else if (!validationEmail.test(email.value)) {
    createNotification('email');
    notificationBlock.classList.toggle('notification__error');

    return;
  } else if (!validationPhone.test(phone.value)) {
    createNotification('phone');
    notificationBlock.classList.toggle('notification__error');

    return;
  }

  if (validationName.test(userName.value) && userName.value !== ''
    && validationUser.test(user.value) && user.value !== ''
    && validationEmail.test(email.value) && email.value !== ''
    && validationPhone.test(phone.value) && phone.value !== '') {
    createNotification('success');

    return;
  }

  submit.disabled = true;
});

function clearForm() {
  userName.value = '';
  user.value = '';
  email.value = '';
  phone.value = '';
}

function createNotification(value) {
  submit.disabled = true;

  if (value === 'success') {
    clearForm();
  }

  if (value === 'name'
    || value === 'email'
    || value === 'user'
    || value === 'phone'
  ) {
    notification.insertAdjacentHTML('afterbegin', `
      <div>
        <h2 class='notification__title'>
          Warming
        </h2>
        <p class='notification__text'>
          ${value} is not correct
        </p>
      </div>
    `
    );
    notification.classList.toggle('notification__error');
  }

  if (value === 'success') {
    notification.insertAdjacentHTML('afterbegin', `
      <div>
        <h2 class='notification__title'>
          Success
        </h2>
        <p class='notification__text'>
          Form submitted successfully
        </p>
      </div>
    `
    );
  }

  if (value === 'error') {
    notification.insertAdjacentHTML('afterbegin', `
        <div>
          <h2 class='notification__title'>
            Error
          </h2>
          <p class='notification__text'>
            Value must be more than 2 symbols
          </p>
        </div>
      `
    );
  }

  body.append(notification);
  notification.classList.add('notification__message');

  setTimeout(() => {
    notification.lastElementChild.remove();
    notification.classList.remove('notification__message');
    notificationBlock.classList.remove('notification__error');
    submit.disabled = false;
  }, 3000);
}
