import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PlotGrid from './PlotGrid';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import PlotFilters from "./PlotFilters";
function PurchaseProperty() {
  const dispatch = useDispatch()
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading())
        const { data } = await server.get('/getallpptdata');
        setPlots(data)
        dispatch(stopLoading())
      } catch (e) {
        dispatch(stopLoading())
      }
    })()
  }, [])

  return (
    <Fragment>
      <PlotFilters plots={plots} setPlots={setPlots} />
      <PlotGrid plots={plots} />
    </Fragment>
  );
}
export default PurchaseProperty;
