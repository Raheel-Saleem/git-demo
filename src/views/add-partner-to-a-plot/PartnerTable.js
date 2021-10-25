
import React, { useState, useEffect } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';

import { startLoading, stopLoading } from '../../store/actions';
import server from '../../server/server';
import swal from 'sweetalert';
const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => {

    return {
      root: {
        '& .MuiDataGrid-cell--editing': {
          backgroundColor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
        },
        '& .Mui-error': {
          backgroundColor: `rgb(126,10,15,0.1)`,
          color: theme.palette.error.main,
        },
      },
    };
  },
  { defaultTheme },
);

const columns = [
  { field: 'id', headerName: 'ID', editable: false, hidden: true, width: 50, },
  { field: 'name', headerName: 'Name', editable: false, width: 150, },
  { field: 'cnic', headerName: 'CNIC', editable: false, width: 140, },
  { field: 'contactNo', headerName: 'Phone Num', editable: false, width: 200, },
  { field: 'amountToInvest', headerName: 'Amount In Account', editable: false, width: 250, },

  {
    field: 'amount',
    headerName: 'Amount to Invest',
    editable: true,
    width: 240,
  }
];

export default function ConditionalValidationGrid({ setValues }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [partnersData, setPartnersData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading())
        const { data } = await server.get('/getallpartnersforpayments');
        setPartnersData(data)
        dispatch(stopLoading())
      } catch (e) {
        dispatch(stopLoading())
      }
    })()

  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={classes.root}
        rows={partnersData}
        columns={columns}
        editMode="row"
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = partnersData.filter((row) => selectedIDs.has(row.id));
          console.log("onSelectionModelChange:", selectedRowData);
          console.log("data");
          let partnersArray = [];
          for (let selectedPartner of selectedRowData) {
            for (let partner of partnersData) {
              if (partner.id === selectedPartner.id) {
                partnersArray.push(partner)
              }
            }
          }


          setValues("userid", partnersArray);
          console.log("selectedRow", partnersArray)
        }}
        onEditCellPropsChange={(data) => {
          console.log(data, "::::::::::::::::::::::::::daata")
          let partnersArray = [];
          for (let partner of partnersData) {
            if (partner.id === data.id) {
              const newObj = { ...partner, amount: data.props.value };
              partnersArray.push(newObj)
            } else {
              partnersArray.push(partner)
            }
          }
          console.log(partnersArray, "::::::::::::::::::::::::::partnersArray")

        }}
      />
    </div>
  );
}