let pedidos = []; //inicia o array de pedidos, para depois ser adicionado os itens enviados pelo formulário
const estoque = require('../mocks/estoque'); //estoque de medicamentos

function adicionarPedido(pedido) { //adiciona o pedido enviado pela rota ao array
    try {
        pedido.status = 'Pendente';
        pedidos.push(pedido);
        return { success: true, message: 'Pedido adicionado com sucesso' };
    } catch (error) {
        console.error('Erro ao adicionar pedido:', error);
        return { success: false, message: 'Erro ao adicionar pedido' };
    }
}

function getPedidos(lojaId = null, userEmail = null) {
    try {
        var pedidosLoja = [];

        // Filtra os pedidos da loja especificada
        if(lojaId) {
            pedidosLoja = pedidos.filter(pedido => pedido.loja == lojaId);
        }

        // Filtra os pedidos do usuário especificado
        if(userEmail) {
            pedidosLoja = pedidos.filter(pedido => pedido.email == userEmail);
        }

        // apenas os campos desejados
        const pedidosFiltrados = pedidosLoja.map(pedido => {
            const medicamento = estoque[pedido.medicamento];
            return {
                cim: pedido.cim,
                email: pedido.email,
                beneficiado: pedido.beneficiado,
                medicamento: medicamento ? medicamento.medicamento : 'Medicamento não encontrado',
                status: pedido.status
            };
        });

        // Verifica se foram encontrados pedidos
        if (pedidosFiltrados.length > 0) {
            return { success: true, message: 'Pedidos encontrados com sucesso', data: pedidosFiltrados};
        } else {
            return { success: false, message: 'Nenhum pedido encontrado para essa loja', data: [] };
        }
    } catch (error) {
        return { success: false, message: 'Erro ao procurar pedidos', data: [] };
    }
}

module.exports = { adicionarPedido, getPedidos };