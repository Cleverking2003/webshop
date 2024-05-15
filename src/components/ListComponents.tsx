import { ArrayField, Datagrid, ImageField, List, NumberField, ReferenceField, SingleFieldList, TextField } from 'react-admin';

export const ImageList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="item" reference='items'/>
            <ImageField source="file" />
        </Datagrid>
    </List>
);

export const ItemList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="desc" />
            <TextField source="price" />
            <NumberField source="amount" />
            <ArrayField source="images"><SingleFieldList><ImageField source="file" /></SingleFieldList></ArrayField>
            <ReferenceField source="brand" reference='brands'/>
            <ReferenceField source="category" reference='categories'/>
        </Datagrid>
    </List>
);

export const CategoryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="desc" />
        </Datagrid>
    </List>
);

export const BrandList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="desc" />
        </Datagrid>
    </List>
);
