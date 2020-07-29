import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import Product from './Product';
//import Pagination from '../pagination/Pagination';
import { findProductsAction } from '../../redux/actions/productsActions';
import PaginationFind from '../pagination/PaginationFind';
import Swal from 'sweetalert2';
const FindProduct = (props) => {

    const [name, setName] = useState('');

    //State
    const { searchedProduct, total } = props;
    //Functions
    const { findProd } = props;


    const findProduct = (e) => {
        e.preventDefault();
        findProd(name, 0, 5).then(value => {
            if (!value) {
                Swal.fire("Error!", "Não foi achado nenhum produto com esse nome!", "error");
            }
        });

    }



    return (
        <React.Fragment>
            <div className="container my-2">
                <NavBar />
                <form onSubmit={findProduct}>

                    <h1>Buscar</h1>
                    <div className="d-flex">
                        <input type="text" name="name" onChange={e => setName(e.target.value)} placeholder="Nome do Produto" className="form-control mr-2" />
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>
                </form>
                <div>
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
                                {searchedProduct.map(product => (

                                    <Product key={product._id} product={product} />
                                ))}

                            </tbody>
                        </table>


                        {searchedProduct.length > 0 ? (<PaginationFind name={name} pageSize={5} itemCount={total} />) : (null)}


                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {

    return {
        searchedProduct: state.products.searchedProduct,
        total: state.products.totalFound
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findProd: (name, from, limit) => dispatch(findProductsAction(name, from, limit))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindProduct);