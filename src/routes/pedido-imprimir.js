const express = require('express');
const router = express.Router();
const { fetchOrderForPrint } = require('../queries/selects/select-pedidos');

router.get('/:pedidoId', async function (req, res, next) {
  const pedidoId = req.params.pedidoId;

  const formattedOrders = await fetchOrderForPrint(pedidoId);
  console.log('pedido-imprimir:', formattedOrders)
  if (!formattedOrders) {
    return res.status(404).send('Pedido não encontrado');
  }

  res.render('pedido-imprimir', {
    title: 'Imprimir Pedido - CVBCXS dispensário',
    page: 'pedido-imprimir',
    system: false,
    // printable: true,
    data: {
      pedido: formattedOrders[0],
    },
  });
});

module.exports = router;
