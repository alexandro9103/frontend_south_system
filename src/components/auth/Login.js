import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios.config';
import Swal from 'sweetalert2';
const Login = (props) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();

        try {
            const resp = await axiosClient.post('/authenticate', user);

            if (resp.data.token) {
                localStorage.setItem("token", resp.data.token);
                props.history.push('/products');

            }
        } catch (error) {
            if (!error.response.data.token) {
                Swal.fire(
                    'Sistema!',
                    `${error.response.data.message}`,
                    'error'
                )
            }
        }
    }


    return (
        <React.Fragment>
            <div className="container">
                <form onSubmit={login}>


                    <div className="md-col-4 my-5 text-center">
                        <h1>Seja bem-vindo a South System</h1>
                    </div>

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
                                <input type="submit" className="btn btn-primary btn-block" value="Entrar" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-4">
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <Link to="/sign-up" className="btn btn-dark btn-block">Cadastrar</Link>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </React.Fragment>

    );
}

export default withRouter(Login);