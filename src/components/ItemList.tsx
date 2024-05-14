import { ArrayField, ChipField, Datagrid, ImageField, List, NumberField, ReferenceField, SingleFieldList, TextField } from 'react-admin';

export const ItemList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="desc" />
            <TextField source="price" />
            <NumberField source="amount" />
            <ArrayField source="images"><SingleFieldList><ImageField source="file" /></SingleFieldList></ArrayField>
            <ReferenceField source="brand.id" reference='brands'/>
            <ReferenceField source="category.id" reference='categories'/>
        </Datagrid>
    </List>
);
