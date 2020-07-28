import React from 'react';
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { deleteProductAction } from '../../redux/actions/productsActions';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //State
    const { product } = props;

    //Functions
    const { deleteProduct } = props;

    const deleteProd = (id) => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir o produto?',
            text: "Um produto excluído não pode ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {


                try {
                    deleteProduct(id).then(value => {
                        if (value) {
                            Swal.fire(
                                'Sistema!',
                                'Produto excluido com sucesso!',
                                'success'
                            );
                        } else{
                            Swal.fire(
                                'Sistema!',
                                'O Produto não foi excluido!',
                                'error'
                            );
                        }
                    });


                    Swal.fire(
                        'Sistema!',
                        'Produto excluido com sucesso!',
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                }

            }
        })

    }

    return (

        <React.Fragment>
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                    <Link to={`/product-detail/${product._id}`} className="btn btn-info mr-2 btn-sm">Ver</Link>
                    <Link to={`/edit-product/${product._id}`} className="btn btn-success mr-2 btn-sm">Editar</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProd(product._id)}>Excluir</button>
                </td>
            </tr>
        </React.Fragment>

    );
}

const mapDispatchToProps = dispatch => {

    return {
        deleteProduct: (id) => dispatch(deleteProductAction(id))
    }
}

export default connect(null, mapDispatchToProps)(Product);