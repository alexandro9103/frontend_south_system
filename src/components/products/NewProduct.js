import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductAction } from '../../redux/actions/productsActions';
import NavBar from '../NavBar/NavBar';
import Swal from 'sweetalert2';

const NewProduct = (props) => {


    const { addProduct } = props;

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        quantity: 0
    })



    const createProduct = (e) => {
        e.preventDefault();
        if (Number.isInteger(parseFloat(product.quantity))) {
            product.quantity = parseInt(product.quantity);
            addProduct(product).then(() => {
                props.history.push("/products");
            });
        } else {
            Swal.fire("Error", "A quantidade tem que ser um número inteiro!", "error");
        }


    }

    const handleProduct = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    return (


        <React.Fragment>

            <div className="container my-2">

                <NavBar />
                <div className="md-col-4 my-5 text-center">
                    <h1>Novo Produto</h1>
                </div>

                <form onSubmit={createProduct}>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" required onChange={handleProduct} className="form-control" name="name" placeholder="Nome do Produto" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="text" required onChange={handleProduct} className="form-control" name="quantity" placeholder="Quantidade" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="text" required onChange={handleProduct} className="form-control" name="price" placeholder="Preço" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="submit" className="btn btn-primary btn-block" value="Cadastrar" />
                            </div>
                        </div>
                    </div>

                </form>


            </div>



        </React.Fragment>


    );
}


const mapDispatchToProps = dispatch => {

    return {
        addProduct: (product) => dispatch(addProductAction(product))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NewProduct));