import { Fragment, useEffect, useState, useRef, forwardRef } from 'react';
import { ReactToPrint, useReactToPrint } from 'react-to-print';
import { Box, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import server from '../../../server/server';
import { stopLoading, startLoading } from '../../../store/actions';

import swal from 'sweetalert';
import './SaleInvoice.css';
import { useParams } from 'react-router-dom';

const SaleInvoice = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [saledata, setSaleData] = useState({});

    let { id } = useParams();
    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading());
                const { data } = await server.get(`/saleInvoice/${id}`);
                console.log('data: ', data);
                setSaleData(data[0]);
                dispatch(stopLoading());
            } catch (e) {
                dispatch(stopLoading());
            }
        })();

        console.log('saledata: ', saledata.societyname);
    }, []);
    return (
        <Fragment>
            <div className="receipt-content" ref={ref}>
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
                                                {saledata.societyname}
                                                <br />
                                                {saledata.sectorno} <br />
                                                {saledata.plotno} <br />
                                            </p>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <span>Payment To</span>
                                            <br />
                                            <strong> {saledata.plotownername} </strong>
                                            <p>
                                                {saledata.societyname}
                                                <br />
                                                {saledata.sectorno} <br />
                                                {saledata.plotno} <br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-items">
                                    {/* <div className="headers clearfix">
                                        <div className="row">
                                            <div className="col-sm-4">Description</div>
                                            <div className="col-sm-3">Quantity</div>
                                            <div className="col-sm-5 text-right">Amount</div>
                                        </div>
                                    </div> */}
                                    {/* <div className="items">
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
                                    </div> */}
                                    <div className="total text-right">
                                        <p className="extra-notes">
                                            <strong>Description</strong>
                                            {saledata.description}
                                        </p>
                                        {/* <div className="field">
                                            Subtotal <span>$379.00</span>
                                        </div>
                                        <div className="field">
                                            Shipping <span>$0.00</span>
                                        </div>
                                        <div className="field">
                                            Discount <span>4.5%</span>
                                        </div> */}
                                        <div className="field grand-total">
                                            Total <span>{saledata.plotamount}</span>
                                        </div>
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
});

const PrintInvoice = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'accountsummary'
    });

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="secondary" variant="contained" onClick={handlePrint} sx={{ mt: 3, ml: 1 }}>
                    Print Receipt!
                </Button>
            </Box>
            <SaleInvoice ref={componentRef}></SaleInvoice>
        </div>
    );
};

export default PrintInvoice;
