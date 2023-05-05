function geraSiglaProfissao(nomeProfissao){
    let sigla;
    let iniciais = [];
    let nomeProfissaoSemAcento;
    let temEspaco = 0;

     //remove os acentos do nome da profissão para n dar erro na geracao da sigla
     nomeProfissaoSemAcento = nomeProfissao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

     //verifica de há espaço no nome da profissão, ou seja, se ha mais de uma palavra
     for (let i=0; i < nomeProfissaoSemAcento.length; i++){
         if(nomeProfissaoSemAcento[i] === " "){
           temEspaco++;
         }
     }
     if(temEspaco === 0){
     //se nao ha espacos, a sigla será formada pelos 3 primeiros caracteres
        sigla = nomeProfissaoSemAcento.slice(0, 3);
     }
     else{
         //se houver mais de dois nomes, a sigla sera formada pelo primeiro caractere de cada nome.
         for (let i=0; i < nomeProfissaoSemAcento.length; i++){
             iniciais[0] = nomeProfissaoSemAcento[0];
             if (temEspaco === 1){
                iniciais[1] = nomeProfissaoSemAcento[1];    
                }

             if (nomeProfissaoSemAcento[i] == " ") {
                 iniciais.push(nomeProfissaoSemAcento[i+1]);
             }
         }
         sigla = iniciais.slice(0, 3);
         return sigla;
     }
}
// Log to console
const sigla = geraSiglaProfissao("medico cardiologista testre");
console.log(sigla);