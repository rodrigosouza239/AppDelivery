//Fluxo Adicionar Carrinho

const cart = [
  {
    company_id: null,
    product_id: null,
    attribute_id: null,
    attribute_price: null,
    price_id: null,
    qty: 3,
  },
];

function checkIfItemExists(idProduto) {
  //checar se o produto que estou adicionando ja existe no carrinho para quando ja existir alterar a quantidade e valor
  //retornar o indice ou null
}

function addToCart() {
  const exists = checkIfItemExists();
  if (exists != null) {
    //remover o indice anterior
  } else {
    //adicionar indice novo
  }
}
//--------------------------------------------------------------------------------------------------
//Fluxo Mostrar Produto

useEffect(() => {
  const exists = checkIfItemExists();
  if (exists != null) {
    //setar estados locais de acordo com os dados salvo no reducer de cart
  } else {
    //setar estados local para 0 ou null para não refletir inputs anteriores
  }
}, []);
