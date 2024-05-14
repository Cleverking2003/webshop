import { ArrayInput, Create, ImageInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const BrandCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Create>
);

export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Create>
);

export const ItemCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }}/>
            <TextInput source="name" />
            <TextInput source="desc" />
            <TextInput source="price" />
            <NumberInput source="amount" />
            <ArrayInput source="images"><SimpleFormIterator><TextInput source="id"  InputProps={{ disabled: true }} />
<ImageInput source="file" /></SimpleFormIterator></ArrayInput>
            <ReferenceInput source="brand.id" reference='brands'/>
            <ReferenceInput source='category.id' reference='categories'/>
        </SimpleForm>
    </Create>
);

export const ImageCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <ImageInput source="file" />
        </SimpleForm>
    </Create>
);
