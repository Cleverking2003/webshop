import { ArrayInput, Create, ImageInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const BrandCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Create>
);

export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
        </SimpleForm>
    </Create>
);

export const ItemCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="desc" />
            <TextInput source="price" />
            <NumberInput source="amount" />
            {/* <ArrayInput source="images"><SimpleFormIterator>
<ImageInput source="file" /></SimpleFormIterator></ArrayInput> */}
            <ReferenceInput source="brand" reference='brands'/>
            <ReferenceInput source='category' reference='categories'/>
        </SimpleForm>
    </Create>
);

export const ImageCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source='item' reference='items'/>
            <ImageInput source="image_file" />
        </SimpleForm>
    </Create>
);
