let b7Validator = {
    handleSubmit:(e)=>{
        e.preventDefault()

        let send = true;

        b7Validator.clearErrors()

        let inputs = form.querySelectorAll('input')
        for(let i = 0;i<inputs.length;i++){
            let input = inputs[i] 
            let check = b7Validator.checkInput(input) //envia a variavel criada INPUT que recebe todos os inputs do formulário como parametro
            if(check !== true) {
                send = false
                b7Validator.showError(input, check)
            }
        }
        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null){ //se o rules não estiver vazio
            rules = rules.split('|') //rules vai reatribuir ele mesmo splitando em um array procurando pelo separador |, se ele não achar nenhum separados ele retorna uma string só, no caso se não tivesse o min = 2 ele geraria um array [required] como ele tem um valor | ele vai receber um array ["required", "min=2"]
            for(let k in rules){ //aqui vai percorrer esse array que foi gerado do split
                let rDetails = rules[k].split('=') 
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório'
                        }
                        break
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter pelo menos ' + rDetails[1] + 'caractéres'
                            
                        }
                        break
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(regex.test(input.value.test.toLowerCase())){
                                return 'E-mail invalido'
                            }
                        }
                        break
                }
            }
        }

        return true
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input')
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = ''
        }

        let errorElements = document.querySelectorAll('.error')
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove()
            
        }
    }
} 

let form = document.querySelector('.b7validator')
form.addEventListener('submit', b7Validator.handleSubmit)