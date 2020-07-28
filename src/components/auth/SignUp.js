import React, { useState } from 'react';
import axiosClient from '../../config/axios.config';
import Swal from 'sweetalert2';
import { withRouter, Link } from 'react-router-dom';

const SignUp = (props) => {


    const [user, setUser] = useState({
        username: '',
        password: '',
        role: 'cliente'
    });

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const resp = await axiosClient.post('/create-user', user)
            if (resp.data.user) {
                Swal.fire(
                    'Cadastrado!',
                    'O cadastro foi feito com Sucesso',
                    'success'
                ).then(() => {
                    props.history.push('/');
                });

            } else {
                Swal.fire(
                    'Cadastrado!',
                    'O cadastro não foi feito verifique os dados',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    return (
        <React.Fragment>
            <div className="container">

                <div className="md-col-4 my-5 text-center">
                    <h1>Faça seu cadastro</h1>
                </div>

                <form onSubmit={signUp}>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" required onChange={handleUser} className="form-control" name="username" placeholder="Nome do Usuario" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <input type="password" required onChange={handleUser} className="form-control" name="password" placeholder="Senha" />
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
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <Link to="/" className="btn btn-dark btn-block">Login</Link>
                            </div>
                        </div>
                    </div>
                </form>


            </div>

        </React.Fragment>

    );
}

export default withRouter(SignUp);