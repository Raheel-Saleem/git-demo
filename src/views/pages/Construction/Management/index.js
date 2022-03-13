import { useEffect, useState } from 'react';
import server from '../../../../server/server';
import listData from './listData';
import swal from 'sweetalert';
import { startLoading, stopLoading } from '../../../../store/actions';
import { useDispatch } from 'react-redux';

export default function PlotConstructionManagement() {
    const dispatch = useDispatch();
    const [plotList, setPlotList] = useState([]);
    const [supervisor, setSupervisor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [plotId, setPlotId] = useState(null);
    const [commentList, setCommentList] = useState(Object.keys(listData).map(() => ''));
    const [voilationList, setVoilationList] = useState(Object.keys(listData).map(() => null));
    const [nameList, setNameList] = useState(Object.keys(listData).map(() => ''));

    const handleSubmission = (e) => {
        e.preventDefault();

        (async () => {
            const data = [];
            commentList.forEach((comment, index) => {
                if (comment && data.findIndex((item) => item.toDoId === Object.keys(listData)[index]) === -1) {
                    let cur = {
                        plotId: parseInt(plotId),
                        supervisor,
                        dateStart: startDate,
                        dateFinish: endDate,
                        comment,
                        name: nameList[index],
                        toDoId: parseInt(Object.keys(listData)[index]),
                        violation: voilationList[index]
                    };
                    data.push(cur);
                }
            });

            dispatch(startLoading);
            const response = await server.post('/constructionManagment', data);

            if (response.status === 200) {
                swal('Success!', 'Record Updated Succesfully!', 'success');
            } else {
                swal('Error!', 'Forbidden!', 'error');
            }
            dispatch(stopLoading);
        })();
    };

    useEffect(() => {
        (async () => {
            const { data } = await server.get('/allPlot');
            console.log(data);
            setPlotList(data);
        })();
    }, []);

    const updateCommentList = (e) => {
        const n = e.target.id.split('comment')[1];
        let temp = commentList;
        temp[n] = e.target.value;
        setCommentList(temp);
    };

    const updateNameList = (e) => {
        const n = e.target.id.split('name')[1];
        let temp = nameList;
        temp[n] = e.target.value;
        setNameList(temp);
    };

    const updateVoilationList = (e) => {
        const n = e.target.id.split('voilation')[1];
        let result = null;
        if (e.target.checked) {
            if (e.target.className.split(' ').indexOf('voilation-yes') !== -1) {
                result = true;
            } else if (e.target.className.split(' ').indexOf('voilation-no') !== -1) {
                result = false;
            }
        }
        let temp = voilationList;
        temp[n] = result;
        setVoilationList(temp);
    };

    return (
        <div className="plotConstructionManagement ">
            <div className="w-100 bg-light p-4 rounded">
                <h5>Plot Construction Management</h5>
            </div>
            <br />
            <div className="w-100 bg-light p-4 rounded">
                <form onSubmit={handleSubmission}>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label>Supervisor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={supervisor}
                                    onChange={(e) => setSupervisor(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label>Date Start</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label>Date End</label>
                                <input type="text" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Plot Name</label>
                        <select
                            className="form-control"
                            value={plotId}
                            onChange={(e) => {
                                if (e.target.value !== '-1') {
                                    setPlotId(e.target.value);
                                } else {
                                    setPlotId(null);
                                }
                            }}
                        >
                            <option value="-1">--- Select Plot Name ---</option>
                            {plotList.map((plot, index) => (
                                <option key={index} value={plot.plotId}>
                                    {plot.societyName + ', ' + plot.sectorNo + ', ' + plot.plotNo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <table className="table table-hover table-light rounded border">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Description</th>
                                <th>Comments</th>
                                <th>
                                    <div className="d-flex justify-content-center text-align">(YES)</div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-center text-align">(NO)</div>
                                </th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(listData).map((i, index) => (
                                <tr key={index}>
                                    <td>{i}</td>
                                    <td>{listData[i]}</td>
                                    <td>
                                        <input id={`comment${index}`} onChange={updateCommentList} />
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <input
                                                id={`voilation${index}`}
                                                className="form-check-input voilation-yes"
                                                type="checkbox"
                                                onChange={updateVoilationList}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <input
                                                id={`voilation${index}`}
                                                className="form-check-input voilation-no"
                                                type="checkbox"
                                                onChange={updateVoilationList}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input id={`name${index}`} onChange={updateNameList} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
}
