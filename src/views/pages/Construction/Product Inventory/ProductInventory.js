import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../../server/server';
import { startLoading, stopLoading } from '../../../../store/actions';
import Paginantion from './Paginantion';

const initialValues = {
  "name": "",
  "rate": "",
  "unit": "",
  "quantity": "",
};

const ProductInventory = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const dispatch = useDispatch();

  const rowsPerPage = 10;
  let indexOfLastTodo = page * rowsPerPage;
  let indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
  const totalUsers = products.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  const search = (rows, q) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q) > -1));
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading());
        const { data } = await server.get('/allItems');
        setProducts(data);
        dispatch(stopLoading());
      } catch (e) {
        dispatch(stopLoading());
      }
    })();
  }, [dispatch]);
  return (
    <Fragment>
      <div className="">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>Product Inventory :</h2>
                </div>
                <div className="col-sm-4">
                  <div className="search-box">
                    <i className="material-icons"></i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search…"
                      onChange={(e) => {
                        setQ(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  {/* <th>ID#</th> */}
                  {Object.keys(initialValues)
                    .filter((i) => i.toLocaleLowerCase() !== 'id')
                    .map((column) => {
                      const result = column.replace(/([A-Z])/g, ' $1');
                      const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                      console.log(finalResult);
                      return (
                        <th>
                          {finalResult}
                          <i className="fa fa-sort" />
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {search(products, q)
                  .slice(indexOfFirstTodo, indexOfLastTodo)
                  .map((row) => (
                    <tr key={row.id}>
                      {/* <td>{row.id}</td> */}
                      {Object.keys(initialValues)
                        .filter((i) => i.toLocaleLowerCase() !== 'id')
                        .map((column) => (
                          <td>{row[column]}</td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="clearfix">
              <div className="hint-text">
                Showing <b> {totalUsers < 10 ? totalUsers : 10}</b> out of <b>{totalUsers}</b> entries
              </div>
              <Paginantion currentPage={page} pageNumbers={pageNumbers} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductInventory;
