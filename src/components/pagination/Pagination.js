import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getProductsAction } from '../../redux/actions/productsActions';

const Pagination = (props) => {

    const { itemCount, pageSize, getProd } = props;

    const pagesCount = Math.ceil(itemCount / pageSize);

    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">

                {pages.map(page => (
                    <li key={page} className="page-item"><a onClick={() => getProd((page - 1) * pageSize, 5)} className="page-link" href="#">{page}</a></li>

                ))}

            </ul>
        </nav>

    );
}

const mapDispatchToProps = dispatch => {

    return {
        getProd: (from, limit) => dispatch(getProductsAction(from, limit))
    }
}

export default connect(null, mapDispatchToProps)(Pagination);