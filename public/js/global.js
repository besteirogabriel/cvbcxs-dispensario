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
  $('#loja').on('change', function() {
    var idLojaSelecionada = $(this).val();
    var form = $(this).closest('form');
    if (idLojaSelecionada) {
      // Faz uma requisição AJAX para buscar o endereço da loja selecionada
      $.ajax({
          url: '/pedidos/buscar-endereco-loja/' + idLojaSelecionada,
          method: 'GET',
          success: function(response) {
            // Preenche os campos de endereço com os dados retornados
            $(form).find('#cep').val(response.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2'));
            $(form).find('#endereco').val(response.endereco);
            $(form).find('#numero').val(response.numero);
            $(form).find('#cidade').val(response.cidade);
            $(form).find('#estado').val(response.estado);
            $(form).find('#veneravel').val(response.veneravel);
          },
          error: function(error) {
            console.error('Erro ao buscar endereço da loja:', error);
          }
      });
    }
  });

  //preenche os campos com base no medicamento selecionado
  $('#medicamento-estoque').on('change', function() {
    var medicamentoId = $(this).val();
    console.log('medicamentoId:', medicamentoId)
    var form = $(this).closest('form');
    if (medicamentoId) {
      $.ajax({
          url: '/medicamento-cadastrar/' + medicamentoId,
          method: 'GET',
          success: function(response) {
            // Preenche os campos de endereço com os dados retornados
            $(form).find('#composto').val(response.composto);
            $(form).find('#laboratorio').val(response.laboratorio);
            $(form).find('#unidades-cx').val(response.unidades_cx);
          },
          error: function(error) {
            console.error('Erro ao buscar medicamento:', error);
          }
      });
    }
  });

// Adiciona evento de clique ao botão "Alterar Status" dentro do modal
$('.modal-content').on('click', '.alterar-status', function() {
  var novoStatus = $('#status-select').val();
  
  var conteudoModal = $('.modal-content').html();

  // regex p encontrar o ID do pedido
  var idPedidoRegex = /<strong>ID Pedido:<\/strong>\s*(\d+)/;
  var idPedidoMatch = conteudoModal.match(idPedidoRegex);

  if (idPedidoMatch) {
      var idPedido = idPedidoMatch[1];
      console.log('ID do Pedido:', idPedido);

      // $.ajax({
      //   url: '/pedidos/alterar-status/' + idPedido,
      //   method: 'POST',
      //   data: { status: novoStatus },
      //   success: function(response) {
      //     console.log('Status alterado com sucesso:', response);
      //     location.reload();
      //   },
      //   error: function(error) {
      //     console.error('Erro ao alterar status do pedido:', error);
      //   }
      // });
  } else {
      console.log('ID do Pedido não encontrado.');
  }
});



});
