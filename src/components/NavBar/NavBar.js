import React from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
const NavBar = (props) => {


    const logout = () => {

        Swal.fire({
            title: 'Sair do sistema?',
            text: "Tem certeza que deseja Sair?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Sair!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            if (result.value) {
                localStorage.removeItem('token');
                props.history.push('/');
                Swal.fire(
                    'Sistema!',
                    'Sessão encerrada!',
                    'success'
                )
            }
        })

    }


    return (
        <React.Fragment>
            <div className="d-flex d-flex justify-content-end">
                <button onClick={logout} className="btn btn-secondary" >
                    Sair
                 </button>
            </div>
        </React.Fragment>
    );
}

export default withRouter(NavBar);