$(function() {
  // link ativo do header
  var pageName = $('body').data('name');
  $('nav a[data-active="' + pageName + '"]').addClass('active');

  // select
  $('.js-select2').each(function() {
    $(this).select2({
      placeholder: $(this).data('placeholder')? $(this).data('placeholder'): 'Selecione uma opção',        
      language: {
        noResults: function() {
          return "Nenhum resultado encontrado";
        }
      }
    });
  });

  //preenche os campos de endereço a partir do CEP
  $('#cep').on('input', function() {
    var cep = $(this).val();   
    
    cep = cep.replace(/\D/g, ''); //limpa o campo de CEP

    //faz a busca pelo endereço a partir do CEP e preenche os outros campos
    if (cep.length === 8) {
        cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2'); // Aplica a máscara de CEP (XXXXX-XXX)
        $.ajax({
            url: '/buscar-endereco/' + cep,
            method: 'GET',
            success: function(response) {
                $('#endereco').val(response.logradouro);
                $('#cidade').val(response.localidade);
                $('#estado').val(response.uf);
            },
            error: function(error) {
              console.error('Erro ao buscar endereço:', error);
            }
        });
    }
});
});