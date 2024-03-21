let pedidos = []; //inicia o array de pedidos, para depois ser adicionado os itens enviados pelo formulário

function adicionarPedido(pedido) {
  //adiciona o pedido enviado pela rota ao array
  try {
    pedido.status = 'pendente';
    pedidos.push(pedido);
    return { success: true, message: 'Pedido adicionado com sucesso' };
  } catch (error) {
    console.error('Erro ao adicionar pedido:', error);
    return { success: false, message: 'Erro ao adicionar pedido' };
  }
}

function getPedidosLoja(lojaId) {
  try {
    // Filtra os pedidos da loja especificada
    const pedidosLoja = pedidos.filter((pedido) => pedido.loja == lojaId);


    // Verifica se foram encontrados pedidos
    if (pedidosLoja.length > 0) {
      return {
        success: true,
        message: 'Pedidos encontrados com sucesso',
        data: pedidosLoja,
      };
    } else {
      return {
        success: false,
        message: 'Nenhum pedido encontrado para essa loja',
        data: [],
      };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao procurar pedidos', data: [] };
  }
}

function getPedidos() {
  try {
    // Verifica se foram encontrados pedidos
    if (pedidos.length > 0) {
      return {
        success: true,
        message: 'Pedidos encontrados com sucesso',
        data: pedidos,
      };
    } else {
      return {
        success: false,
        message: 'Nenhum pedido encontrado',
        data: [],
      };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao procurar pedidos', data: [] };
  }
}

module.exports = { adicionarPedido, getPedidosLoja, getPedidos};
