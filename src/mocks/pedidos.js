let pedidos = []; //inicia o array de pedidos, para depois ser adicionado os itens enviados pelo formulário

function adicionarPedido(pedido) { //adiciona o pedido enviado pela rota ao array
    try {
        pedidos.push(pedido);
        return { success: true, message: 'Pedido adicionado com sucesso' };
    } catch (error) {
        console.error('Erro ao adicionar pedido:', error);
        return { success: false, message: 'Erro ao adicionar pedido' };
    }
}

module.exports = { adicionarPedido };