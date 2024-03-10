jQuery(document).ready(function( $ ) {     
    $('#cep').on('input', function() {
        var cep = $(this).val();
        if (cep.length === 8) {
          buscarEndereco(cep);
        }
    });
});


function buscarEndereco(cep) {
    $.ajax({
      url: '/loja-cadastrar/endereco/' + cep,
      method: 'GET',
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.error('Erro ao buscar endereço:', error);
      }
    });
}