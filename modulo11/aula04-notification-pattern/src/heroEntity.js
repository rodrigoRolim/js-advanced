import NotificationContext from "./notificationContext.js";

export default class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super()
    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification('age must be higher than 20!')
    }

    if (this.name?.length < 4) {
      this.addNotification('name must be at least 4 characters')
    }

    return !this.hasNotifications()
  }
}

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!')
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name must be at least 4 characters')
  }

  // simulando um outro error, por exemplo, de banco de dados

  if (Reflect.has(hero, "connectionError")) {
    throw new Error("error connecting to DB!")
  }
}
