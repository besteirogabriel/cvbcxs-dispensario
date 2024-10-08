const express = require('express');
const router = express.Router();
const { fetchOrderForPrint } = require('../queries/selects/select-pedidos');

router.get('/:pedidoId', async function (req, res, next) {
  const pedidoId = req.params.pedidoId;

  try {
    const formattedOrders = await fetchOrderForPrint(pedidoId);
    console.log('pedido-imprimir:', formattedOrders);
    
    if (!formattedOrders || formattedOrders.length === 0) {
      return res.status(404).send('Pedido não encontrado');
    }

    res.render('pedido-imprimir', {
      title: 'Imprimir Pedido - CVBCXS dispensário',
      page: 'pedido-imprimir',
      system: false,
      data: {
        pedido: formattedOrders[0],
      },
    });
  } catch (error) {
    console.error('Erro ao buscar o pedido:', error);
    res.status(500).send('Erro ao buscar o pedido');
  }
});

module.exports = router;
