import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductsAction, findProductsAction } from '../../redux/actions/productsActions';
import Product from './Product';
import NavBar from '../NavBar/NavBar';
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';

const Products = (props) => {

    //State
    const { products, total } = props;

    //Functions
    const { getProd } = props;

    useEffect(() => {
        getProd(0, 5);
    }, []);



    return (
        <React.Fragment>
            <div className="container my-2">

                <NavBar />
                <div>
                    <Link to="/find-product" className="btn btn-info">Buscar</Link>
                </div>

                <hr />
                <div className="d-flex justify-content-between my-3">
                    <div>
                        <h1>Listado de Produtos</h1>
                    </div>

                    <div>
                        <Link to="/new-product" className="btn btn-primary">Novo</Link>
                    </div>

                </div>

                <div className="my-3">
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Nome</th>
                                <th scope="col">Preço </th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}

                        </tbody>
                    </table>

                    <Pagination pageSize={5} itemCount={total} />

                </div>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        total: state.products.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProd: (from, limit) => dispatch(getProductsAction(from, limit)),
        findProd: (name, from, limit) => dispatch(findProductsAction(name, from, limit))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);