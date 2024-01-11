import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { favoritar } from '../store/reducers/favorito'
import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { RootReducer } from '../store'
import { useGetProdutosQuery } from '../services/api'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootReducer) => state.favorito.itens)

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(favoritar(produto))
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            onFavoritar={() => handleFavoritar(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
