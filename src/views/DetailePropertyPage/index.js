// packages block
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, colors, Box, Grid, Container, } from "@material-ui/core";
import { useDispatch } from "react-redux"
// import { Link } from 'react-router-dom';
import { useParams } from "react-router";

// import history from "../../historty";
import { renderItem } from "../../utils/helper";
import server from "../../server/server";
import { startLoading, stopLoading } from "../../store/actions"

const CardComponent = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  const [property, setProperty] = useState({ plotno: "", plotamount: "", plotownername: "", plotsize: "", plottype: "", sectorno: "", societyname: "", description: "" })

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading())
        const { data } = await server.get(`/moregetplotsforppt/${id}`);
        data && data.length !== 0 && data[0] && setProperty(data[0])
        dispatch(stopLoading())
      } catch (e) {
        dispatch(stopLoading())

      }
    })()
  }, [id]);

  const { plotno, plotamount, plotownername, plotsize, plottype, sectorno, societyname, description } = property || {}
  return (
    <Container maxWidth="lg">
      <Box pb={4}>
        <Card className="overflow-visible">
          <Box borderBottom={`1px solid ${colors.grey[300]}`} mb={2}>
            <CardHeader
              title="Property Detail"
            />
          </Box>

          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                {renderItem("Owner Name", plotownername || "N/A")}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Plot Number", plotno || "N/A")}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Size", plotsize || "N/A")}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Plot Amount", plotamount || 'N/A')}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Plot Type", plottype || 'N/A')}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Sector", sectorno || 'N/A')}
              </Grid>

              <Grid item md={4} xs={12}>
                {renderItem("Society Name", societyname || 'N/A')}
              </Grid>

              <Grid item md={12} xs={12}>
                {renderItem("Description", description || 'N/A')}
              </Grid>


              {/* <Grid item md={12} xs={12}>
                <Button variant="contained" color="primary" onClick={() => history.push(`/addPartnerToPlot/${societyname}/${sectorno}/${plotno}`)}>
                  Buy
                </Button>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CardComponent;