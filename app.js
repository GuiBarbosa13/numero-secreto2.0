let sorteados = []
let numMax = 1000
let chuteUser = document.querySelector(".container__input")
let numSecreto = gerarNumSecreto(numMax)
let numTent = 1


function escreverNosCampos(tag , texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate: 1.8})//faz falar o parâmetro texto com voz masculina, velocidade 1.8
}

function escreverInicial(){
    escreverNosCampos('h1','Jogo do número secreto')
    escreverNosCampos('p', `Digite um número entre 1 e ${numMax} para começar`)
}

escreverInicial()

function gerarNumSecreto(n){
    let numeroEscolhido =  parseInt(Math.random()*n+1)//cria uma variavel para salvar o número sorteado

    if(sorteados.length == numMax){
        sorteados = []
    }

    if(sorteados.includes(numeroEscolhido)){//se o número sorteado já estiver sido sorteado antes
        return gerarNumSecreto(numMax)//gera um novo número aleatório
    }else{
        sorteados.push(numeroEscolhido)//senão for um número já sorteado anteriormente esse número sorteado é adicionado na lista de sorteados
        return numeroEscolhido // return atribui o resultado do Math random em uma variável
    }    
}


function verificarChute(){
    let numChute = chuteUser.value
    escreverNosCampos('p', '')

    if(numChute == numSecreto){
        let palavraTente = numTent > 1? 'tentativas' : 'tentativa'
        let tentNumText = `${numTent} ${palavraTente}.`
        escreverNosCampos('h1', `Parabéns! Você acertou o número secreto! ${numSecreto}.`)
        escreverNosCampos('p',`Em ${tentNumText}`)
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else if(numChute > numSecreto){
        escreverNosCampos('p', `O número secreto é menor que ${numChute}`)
        numTent++
    }else if(numChute < numSecreto){
        escreverNosCampos('p', `O número secreto é maior que ${numChute}`)
        numTent++
    }

    chuteUser.value = ""
    chuteUser.focus()
}

function reiniciar(){
    escreverInicial()
    numSecreto = gerarNumSecreto(numMax)
    chuteUser.focus()
    numTent = 1
    document.getElementById('reiniciar').setAttribute('disabled',true)
}
