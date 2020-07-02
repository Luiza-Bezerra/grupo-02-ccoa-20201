function enviarDuvida(){
    var formulario = new URLSearchParams(new FormData(form_email));
    fetch("/usuarios/enviarEmail", {
          method: "POST",
          body: formulario
      }).then(function (response) {
          
      

             
            

          
      });
      alert('Agora irar Receber as Novidades da Luminous em seu email')
      return false
    }