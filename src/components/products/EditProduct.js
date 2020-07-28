import React, { useState, useEffect } from 'react';
import { getPorductById } from '../utils/products-repository';
import { connect } from 'react-redux';
import { updateProductAction } from '../../redux/actions/productsActions';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Swal from 'sweetalert2';

const EditProduct = (props) => {

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        quantity: 0
    })

    const { id } = props.match.params;


    const { updateProd } = props;

    useEffect(() => {
        getPorductById(id).then((prod) => {
            setProduct(prod);
        }).catch(err => {
            console.log(err);;
        })
    }, []);

    const updateProduct = (e) => {
        e.preventDefault();

        if (Number.isInteger(parseFloat(product.quantity))) {
            product.quantity = parseInt(product.quantity);
            updateProd(id, product).then(() => {
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
                    <h1>Editar Produto</h1>
                </div>

                <form onSubmit={updateProduct}>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" value={product.name} required onChange={handleProduct} className="form-control" name="name" placeholder="Nome do Produto" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="number" required value={product.quantity} pattern="^[0-9]+" onChange={handleProduct} className="form-control" name="quantity" placeholder="Quantidade" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="text" required value={product.price} onChange={handleProduct} className="form-control" name="price" placeholder="Preço" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="submit" className="btn btn-primary btn-block" value="Atualizar" />
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
        updateProd: (id, product) => dispatch(updateProductAction(id, product))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(EditProduct));