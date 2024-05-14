import { ArrayInput, Edit, ImageInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const BrandEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Edit>
);

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Edit>
);

export const ItemEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }}/>
            <TextInput source="name" />
            <TextInput source="desc" />
            <TextInput source="price" />
            <NumberInput source="amount" />
            <ArrayInput source="images"><SimpleFormIterator><TextInput source="id" />
<TextInput source="file" /></SimpleFormIterator></ArrayInput>
            <ReferenceInput source="brand.id" reference='brands'/>
            <ReferenceInput source='category.id' reference='categories'/>
        </SimpleForm>
    </Edit>
);

export const ImageEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <ImageInput source="file" />
        </SimpleForm>
    </Edit>
);
