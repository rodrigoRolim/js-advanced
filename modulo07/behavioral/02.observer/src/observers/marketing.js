export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsável por gerenciar seus errors/exeptions
    // não deve se ter await no notify porque a responsbilidade do notify é so emitir eventos
    // so notificar todo mundo
    console.log(`[${id}]: [marketing] will send an welcome email to ${userName}`)
  }
}
