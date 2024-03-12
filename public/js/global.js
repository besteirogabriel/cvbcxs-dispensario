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
    var form = $(this).closest('form');  
    cep = cep.replace(/\D/g, ''); //limpa o campo de CEP

    //faz a busca pelo endereço a partir do CEP e preenche os outros campos
    if (cep.length === 8) {
      $(this).val(cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')); // Aplica a máscara de CEP (XXXXX-XXX)
      $.ajax({
        url: '/buscar-endereco/' + cep,
        method: 'GET',
        success: function(response) {
          $(form).find('#endereco') && $(form).find('#endereco').val(response.logradouro);
          $(form).find('#cidade') && $(form).find('#cidade').val(response.localidade);
          $(form).find('#estado') && $(form).find('#estado').val(response.uf);
        },
        error: function(error) {
          console.error('Erro ao buscar endereço:', error);
        }
      });
    }
  });

  //preenche os campos com o endereço da loja
  $('#loja').change(function() {
    var idLojaSelecionada = $(this).val();
    var form = $(this).closest('form');
    if (idLojaSelecionada) {
      // Faz uma requisição AJAX para buscar o endereço da loja selecionada
      $.ajax({
          url: '/pedidos/buscar-endereco-loja/' + idLojaSelecionada,
          method: 'GET',
          success: function(response) {
            // Preenche os campos de endereço com os dados retornados
            $(form).find('#cep').val(response.cep);
            $(form).find('#endereco').val(response.endereco);
            $(form).find('#numero').val(response.numero);
            $(form).find('#cidade').val(response.cidade);
            $(form).find('#estado').val(response.estado);
          },
          error: function(error) {
            console.error('Erro ao buscar endereço da loja:', error);
          }
      });
    }
  });
});