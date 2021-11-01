// packages block
import React from "react";
import { Card, CardContent, CardHeader, colors, Box } from "@material-ui/core";
import { renderItem } from "../../utils/helper";
const CardComponent = () => {
  return (
    <Box pb={4}>
      <Card className="overflow-visible">
        <Box borderBottom={`1px solid ${colors.grey[300]}`} mb={2}>
          <CardHeader
            title="Property Detail"
          />
        </Box>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              {renderItem("Name", name || "N/A")}
            </Grid>

            <Grid item md={4} xs={12}>
              {renderItem("Location", location?.name || "N/A")}
            </Grid>

            <Grid item md={12} xs={12}>
              {renderItem("Address", address || "N/A")}
            </Grid>

            <Grid item md={12} xs={12}>
              {renderItem("Description", description || 'N/A')}
            </Grid>

            <Grid item md={12} xs={12}>
              {renderItem("Detail overview", detailOverview || 'N/A')}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;