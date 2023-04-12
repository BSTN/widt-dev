import { v4 as uuid } from "uuid";

interface Message {
  type?: String,
  id: String,
  message?: String,
  text?: String
}
interface Messages extends Array<Message>{ }

interface Options {
  type?: String,
  text?: String,
  id: String,
  duration: Number
}
interface Alert {
  text: String,
  buttonText: String,
  id: String
}
interface Alerts extends Array<Alert>{ }

type fun = (value?: string) => void

interface Confirm {
  text: String,
  buttons: Array<String>,
  id: String,
  reject: fun,
  resolve: fun
}
interface Confirms extends Array<Confirm>{}

interface Choice {
  text: String,
  buttons: Array<String>,
  id: String,
  reject: fun,
  resolve: fun
}
interface Choices extends Array<Choice>{ }
interface ChoiceOptions {
  choices: Array<string>
}

export const useNotify = () => {
  
  // define messages
  const messages = useState<Messages>('_messages', () => [])
  const alerts = useState<Alerts>('_alerts', () => [])
  const confirms = useState<Confirms>('_confirms', () => [])
  const choices = useState<Choices>('_choices', () => [])

  function removeMessage(id: String) {
    if (messages.value.find(x => x.id === id)) {
      messages.value.splice(messages.value.findIndex(x => x.id === id), 1)
    }
  }
  function removeAlert(id: String) {
    if (alerts.value.find(x => x.id === id)) {
      alerts.value.splice(alerts.value.findIndex(x => x.id === id), 1)
    }
  }

  const alert = function (text: String, buttonText?: String ) {
    const alert = {
      text: text || 'Alert',
      buttonText: buttonText || 'Ok',
      id: uuid()
    }
    alerts.value.push(alert)
  }

  function removeConfirm(id: String) {
    if (confirms.value.find(x => x.id === id)) {
      confirms.value.splice(confirms.value.findIndex(x => x.id === id), 1)
    }
  }
  
  const confirm = function (text: String, options?: Options) {
    return new Promise((resolve, reject) => {
      const id = uuid()
      const confirm = {
        text: text || 'Alert',
        buttons: ['ok','annuleren'],
        id,
        resolve: () => {
          removeConfirm(id)
          resolve(true)
        },
        reject: () => {
          removeConfirm(id)
          resolve(false)
        }
      }
      confirms.value.push(confirm)
    })
  }

  function removeChoice(id: String) {
    if (choices.value.find(x => x.id === id)) {
      choices.value.splice(choices.value.findIndex(x => x.id === id), 1)
    }
  }

  const choose = function (text: String, options: ChoiceOptions) {
    return new Promise((resolve, reject) => {
      const id = uuid()
      const choice = {
        text,
        buttons: options.choices || ['ok', 'annuleer'],
        id,
        resolve: (item:String) => {
          removeChoice(id)
          resolve(item)
        },
        reject: () => {
          removeChoice(id)
          reject()
        }
      }
      choices.value.push(choice)
    })
  }

  const message = function(message:String, options?:Options) {
    const defaults = {
      type: 'normal',
      id: uuid(),
      duration: 3000
    }
    const obj = Object.assign(defaults, options)
    obj.text = message
    messages.value.push(obj)
    setTimeout(() => removeMessage(defaults.id), obj.duration)
  }

   const error = function(message:String, options?:Options) {
    const defaults = {
      type: 'error',
      id: uuid(),
      duration: 3000
    }
    const obj = Object.assign(defaults, options)
    obj.text = message
    messages.value.push(obj)
    setTimeout(() => removeMessage(defaults.id), obj.duration)
  }

  return { messages, alerts, message, alert, removeAlert, confirm, confirms, choose, choices, error, removeMessage }
}