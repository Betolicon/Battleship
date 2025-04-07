const {humanPlayer} = require('./classes/player')
import { setName } from './gameFunctions'

export function dialogHandler (){
    const button = document.getElementById('start')
    const confirmButton = document.getElementById('confirm')
    const dialog = document.querySelector('dialog')
    const input = document.querySelector('input')

    function showModal(){
        dialog.showModal()
    }

    button.addEventListener('click',showModal)

    function confirmInfo (e){        
        e.preventDefault()
        if(input.value !== ''){
            dialog.close()
            const player = new humanPlayer(input.value)
            setName(player)
            button.remove()
        }
        else{
            input.setCustomValidity("Type a name")
            input.reportValidity()
       }
    }

    confirmButton.addEventListener('click', confirmInfo)

    return { showModal }
}