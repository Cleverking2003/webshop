import { Datagrid, ImageField, List, TextField } from 'react-admin';

export const ImageList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ImageField source="file" />
        </Datagrid>
    </List>
);
