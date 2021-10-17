import { useState, useEffect, forwardRef } from 'react';
import tabledata from '../tabledata';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { TextField } from '@material-ui/core';
import useStyles from '../SideMenu/Style';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const rows = tabledata.map((obj) => {
    return {
        id: obj.id,
        name: obj.name,
        cnic: obj.cnic,
        phone: obj.phone,
        accAmount: obj.accAmount,
        amount: obj.amount
    };
});
const columns = [
    { field: 'id', title: 'ID', editable: 'never', hidden: true },
    { field: 'name', title: 'Name', editable: 'never' },
    { field: 'cnic', title: 'CNIC', editable: 'never' },
    { field: 'phone', title: 'Phone Num', editable: 'never' },
    { field: 'accAmount', title: 'Amount In Account', editable: 'never' },

    {
        field: 'amount',
        title: 'Amount to Invest',

        validate: (rowData) => {
            if (rowData.amount === undefined || rowData.amount === '') {
                return 'Required';
            } else if (rowData.amount > rowData.accAmount) {
                return ' insufficient balance';
            } else if (rowData.amount < 0 || isNaN(rowData.amount)) {
                return 'invalid ammount';
            }
        }
    }
];

function Table() {
    const [select, setSelect] = useState([]);
    const [data, setData] = useState(rows);
    const [col, setCol] = useState(columns);
    const [payload, setPayload] = useState([]);

    const handleSelectedRows = (selectedRow) => {
        setSelect(selectedRow);
    };

    useEffect(() => {
        let checkedValues = [];
        if (Array.isArray(select)) {
            select.forEach((item) => {
                let obj = {};
                obj.id = item.id;
                obj.amount = item.amount;
                checkedValues.push(obj);
            });
        }
        console.log('check values', checkedValues);
        console.log('selected rows', select);
    }, [select]);

    return (
        <div>
            <MaterialTable
                title="Add Partner "
                columns={col}
                data={data}
                icons={tableIcons}
                options={{
                    selection: true
                }}
                onSelectionChange={(rows) => handleSelectedRows(rows)}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        let p = new Promise((resolve, reject) => {
                            if (newData.amount > 0 && newData.amount < oldData.accAmount) {
                                resolve('success');
                            } else {
                                reject('failed');
                            }
                        });

                        p.then((msg) => {
                            console.log('then block', msg);
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                            }, 500);
                        }).catch((msg) => {
                            console.log('catch block', msg);
                        });

                        return p;
                    }
                }}
            />
        </div>
    );
}

export default Table;
