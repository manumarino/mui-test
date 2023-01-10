import React, {useState} from 'react';
import {Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery} from "@mui/material";
import {useGetProductsQuery} from "state/api";
import Header from 'components/Header';

const Company = () => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
        }}>
            <CardContent>
                <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
                    Compañía
                </Typography>
                <Typography variant="h5" component="div"> 
                    Debmedia
                </Typography>
                <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
                    2022
                </Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2">
                    Diciembre
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                variant="primary"
                size="small"
                onClick={() => setIsExpanded(!isExpanded)} >
                    See More
                </Button>
            </CardActions>
            <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{
                color: theme.palette.neutral[300]
            }}
            >
                <CardContent>
                    <Typography>id: 01 </Typography>
                    <Typography>Supply Left: x </Typography>
                    <Typography>Yearly Sales This Year: x </Typography>
                    <Typography>Yearly Units Sold This Year: x </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

function Companies() {
    const {data, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
        <Header title="COMPAÑÍAS" subtitle="Listado de compañías" />
            <Box mt="20px" 
            display="grid" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
            justifyContent="space-between" 
            rowGap="20px" 
            columnGap="1.33%" 
            sx={{"& > div": {gridColumn: isNonMobile ? undefined : "span 4"}}}>
                
                    <Company />
                    <Company />
                    <Company />
                    <Company />
                    <Company />
                
            </Box>
    </Box>
  )
}

export default Companies
