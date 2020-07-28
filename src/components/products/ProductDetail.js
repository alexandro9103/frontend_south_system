import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { getPorductById } from '../utils/products-repository';
import { Link } from 'react-router-dom';


const ProductDetail = (props) => {

    const [product, setProduct] = useState({});

    const { id } = props.match.params;
    useEffect(() => {
        getPorductById(id).then(prod => {
            setProduct(prod);
        });
    }, []);



    return (
        <React.Fragment>

            <div className="container my-2">

                <NavBar />
                <div className="md-col-4 my-5 text-center">
                    <h1>Detalhes do Produto</h1>
                </div>

                <form >
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <p>Nome : {product.name}</p>

                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <p>Quantidade : {product.quantity}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <p>Preço : {product.price}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <Link to="/products" type="submit" className="btn btn-primary btn-block"  >Voltar</Link>
                            </div>
                        </div>
                    </div>

                </form>
            </div>


        </React.Fragment>
    );
}

export default ProductDetail;