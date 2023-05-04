import * as React from 'react';
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack';


export default function PinControl({ pinNumber }) {
    const [value, setValue] = React.useState('');
    const handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setValue(event.target.value);
    };

    return (
        <Card>
            <Stack spacing={2}>
                <Typography variant="h6">{"GPIO " + pinNumber}</Typography>
                <Grid2 container>
                    <Grid2 xs={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="pin-action" fullwidth>Command</InputLabel>
                            <Stack spacing={2}>
                                <Select
                                    labelId="pin-action"
                                    id="pin-action"
                                    label="Command"
                                    fullwidth
                                >
                                    <MenuItem value="pinMode">pinMode</MenuItem>
                                    <MenuItem value="digitalRead">digitalRead</MenuItem>
                                    <MenuItem value="analogRead">analogRead</MenuItem>
                                    <MenuItem value="digitalWrite">digitalWrite</MenuItem>
                                    <MenuItem value="analogWrite">analogWrite</MenuItem>
                                </Select>
                                <TextField
                                    id="pin-value"
                                    label="Value"
                                    type="number"
                                    onChange={handleChange}
                                    value={value}
                                />
                            </Stack>
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" color="secondary" style={{ maxWidth: '60px', maxHeight: "120px", minWidth: '60px', minHeight: "120px" }}>POST</Button>
                    </Grid2>
                </Grid2>
            </Stack>
        </Card >
    );
}