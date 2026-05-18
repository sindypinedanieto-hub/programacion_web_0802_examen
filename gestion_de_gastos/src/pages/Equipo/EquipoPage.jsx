
import { Grid, Card, CardContent, Typography } from "@mui/material";
import PageContainer from "../../components/commons/PageContainer";
 
export default function Equipo(){
    return (
        <PageContainer title="Equipo de trabajo">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Juan Carlos Albarrán Sánchez</Typography>
                        <Typography>Rol: Full Stack Developer</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Luz Nadia Flores Domínguez</Typography>
                        <Typography>Rol: Arquitecta de Software</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Sindy Pineda Nieto</Typography>
                        <Typography>Rol: Diseñadora UX/UI</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </PageContainer>        
    )
}