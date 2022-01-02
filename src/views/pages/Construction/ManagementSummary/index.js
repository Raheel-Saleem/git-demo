import { useEffect, useState } from 'react';
import server from '../../../../server/server';
import { Link } from 'react-router-dom';

export default function PlotConstructionManagementSummary() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await server.get('/getPlotForConstructionManagment');
            setDataList(data);
        })();
    }, []);

    return (
        <div className="plotConstructionManagement">
            <div className="w-100 bg-light p-4 rounded">
                <h5>Plot Construction Management Summary</h5>
            </div>
            <br />
            <div className="w-100 bg-light p-4 rounded">
                {
                    <table className="table table-hover table-light rounded border">
                        <thead>
                            <tr>
                                <th>Date Finish</th>
                                <th>Date Start</th>
                                {/* <th>Plot Id</th> */}
                                <th>Plot No</th>
                                <th>Sector No</th>
                                <th>Society Name</th>
                                <th>Supervisor</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((i, index) => (
                                <tr key={index}>
                                    <td>{i.dateFinish}</td>
                                    <td>{i.dateStart}</td>
                                    {/* <td>{i.plotId}</td> */}
                                    <td>{i.plotNo}</td>
                                    <td>{i.sectorNo}</td>
                                    <td>{i.societyName}</td>
                                    <td>{i.supervisor}</td>
                                    <td>
                                        <Link
                                            to={`/construction/plot-construction-management-update/${i.supervisor}/${i.dateStart}/${i.dateFinish}/${i.plotId}`}
                                            className="btn rounded-pill btn-danger text-white btn-sm"
                                        >
                                            <b>Edit</b>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}
