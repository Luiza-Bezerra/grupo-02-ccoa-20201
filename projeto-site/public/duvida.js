function enviarDuvida(){
    var formulario = new URLSearchParams(new FormData(form_email));
    fetch("/usuarios/enviarEmail", {
          method: "POST",
          body: formulario
      }).then(function (response) {
          
          if (response.ok) {

             alert('Agora irar Receber as Novidades da Luminous em seu email')
            

          } else {

              console.log('Erro de cadastro!');
              response.text().then(function (resposta) {
                  console.log(resposta)
              });
         
          }
      });

      return false
    }