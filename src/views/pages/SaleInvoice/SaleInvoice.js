import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { stopLoading, startLoading } from '../../../store/actions';

import swal from 'sweetalert';
import './SaleInvoice.css';
import { useParams } from 'react-router-dom';

const SaleInvoice = () => {
    const dispatch = useDispatch();
    const { saledata, setSaleData } = useState();

    let { id } = useParams();
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get(`/saleInvoice/${id}`);
                setSaleData(data);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();
    }, [dispatch]);
    return (
        <Fragment>
            <div className="receipt-content">
                <div className="container bootstrap snippets bootdey">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="invoice-wrapper">
                                <div className="intro">
                                    <h1>Elinks</h1>
                                </div>
                                <div className="payment-details">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <span>Client</span>
                                            <br />
                                            <strong> Bahria </strong>
                                            <p>
                                                989 5th Street <br />
                                                Bahria <br />
                                                55839 <br />
                                                Karachi <br />
                                            </p>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <span>Payment To</span>
                                            <br />
                                            <strong> Bahria </strong>
                                            <p>
                                                989 5th Street <br />
                                                Bahria <br />
                                                55839 <br />
                                                Karachi <br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-items">
                                    <div className="headers clearfix">
                                        <div className="row">
                                            <div className="col-sm-4">Description</div>
                                            <div className="col-sm-3">Quantity</div>
                                            <div className="col-sm-5 text-right">Amount</div>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="row item">
                                            <div className="col-sm-4 desc">item 1</div>
                                            <div className="col-sm-3 qty">3</div>
                                            <div className="col-sm-5 amount text-right">$60.00</div>
                                        </div>
                                        <div className="row item">
                                            <div className="col-sm-4 desc">item 2</div>
                                            <div className="col-sm-3 qty">1</div>
                                            <div className="col-sm-5 amount text-right">$20.00</div>
                                        </div>
                                        <div className="row item">
                                            <div className="col-sm-4 desc">item 3</div>
                                            <div className="col-sm-3 qty">2</div>
                                            <div className="col-sm-5 amount text-right">$18.00</div>
                                        </div>
                                    </div>
                                    <div className="total text-right">
                                        <p className="extra-notes">
                                            <strong>Extra Notes</strong>
                                            Please send all items at the same time to shipping address by next week. Thanks a lot.
                                        </p>
                                        <div className="field">
                                            Subtotal <span>$379.00</span>
                                        </div>
                                        <div className="field">
                                            Shipping <span>$0.00</span>
                                        </div>
                                        <div className="field">
                                            Discount <span>4.5%</span>
                                        </div>
                                        <div className="field grand-total">
                                            Total <span>$312.00</span>
                                        </div>
                                    </div>
                                    <div className="print">
                                        <a href="#">
                                            <i className="fa fa-print" />
                                            Print this receipt
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">Software designed and Developed by Elinks</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaleInvoice;
